'use client';

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
}

export const PetContext = createContext<PetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleChangeSelectedPetId = (id: Pet['id']) => {
    setSelectedPetId(id);
  };
  const petsById = new Map(pets.map((pet) => [pet.id, pet]));
  const selectedPet = selectedPetId ? petsById.get(selectedPetId) : null;

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
