'use client';

import { createPet } from '@/actions/pets/createPet';
import { Pet } from '@/interfaces/Pet';
import { createContext, useState } from 'react';

interface PetContextProviderProps {
  data: Pet[];
  children: React.ReactNode;
}

interface PetContext {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | null | undefined;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (pet: Omit<Pet, 'id'>) => void;
  handleEditPet: (petId: Pet['id'], newPetData: Omit<Pet, 'id'>) => void;
}

export const PetContext = createContext<PetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const petsById = new Map(pets.map((pet) => [pet.id, pet]));
  const selectedPet = selectedPetId ? petsById.get(selectedPetId) : null;

  const handleAddPet = async (pet: Omit<Pet, 'id'>) => {
    // const newPet = { ...pet, id: crypto.randomUUID() };
    // setPets((prev) => [...prev, newPet]);

    await createPet(pet);
  };

  const handleEditPet = async (petId: Pet['id'], newPetData: Omit<Pet, 'id'>) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === petId ? { ...pet, ...newPetData } : pet)),
    );
  };

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setPets((prev) => prev?.filter((pet) => pet.id !== petId));
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = async (id: Pet['id']) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
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
