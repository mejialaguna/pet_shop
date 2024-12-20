import { useContext } from 'react'

import { PetContext } from '@/context/pet-context-provider'

export const usePetContent = () => {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error('something went wrong trying to use PetContext provider');
  }

  return context;
}