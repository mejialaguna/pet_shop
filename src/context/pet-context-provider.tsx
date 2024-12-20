'use client';

import { CheckCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { createContext, useOptimistic, useState } from 'react';

import { createPet, editPet, deletePet } from '@/actions/pets';
import { toast } from '@/components/ui/use-toast';
import { Pet, PetEssentials } from '@/interfaces/Pet';

interface PetContextProviderProps {
  data: Pet[];
  children: React.ReactNode;
}

interface PetContext {
  optimisticPets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | null | undefined;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (pet: PetEssentials) => void;
  handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => void;
}

export const PetContext = createContext<PetContext | null>(null);

interface CreatePetResponse {
  ok: boolean;
  message: string;
}

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, {action , payload}) => {
    switch (action) {
      case 'add':
        return [{ ...payload, id: Math.random().toString() }, ...state];
      case 'edit':
        return state.map((pet) => {
          if (pet.id === payload.id) {
            return { ...pet, ...payload.newPetData };
          }
          return pet;
        });
      case 'delete':
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const petsById = new Map(optimisticPets.map((pet) => [pet.id, pet]));
  const selectedPet = selectedPetId ? petsById.get(selectedPetId) : null;

  const handleActionToast = (message: string, ok: boolean) => {
    return toast({
      description: message,
      variant: !ok ? 'destructive' : 'default',
      className: !ok ? '' : 'bg-green-500 text-white text-lg',
      action: !ok ? <MinusCircledIcon /> : <CheckCircledIcon />,
    });
  }

  const handleAddPet = async (pet: PetEssentials): Promise<CreatePetResponse> => {
    setOptimisticPets({ action: 'add', payload: pet });
    const { ok, message } = await createPet(pet);

    handleActionToast(message, ok);

    return { 
      ok,
      message,
    }
  };

  const handleEditPet = async (petId: Pet['id'], newPetData: PetEssentials):Promise<CreatePetResponse> => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, newPetData } });
    const { ok, message } = await editPet(petId, newPetData);

    handleActionToast(message, ok);

    return {
      ok,
      message,
    };
  };

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const { ok, message } = await deletePet(petId);
    handleActionToast(message, ok);
  };

  const handleChangeSelectedPetId = async (id: Pet['id']) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
