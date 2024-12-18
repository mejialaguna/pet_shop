interface Pet {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
}

interface PetDetailsProps {
  selectedPet: Pet | null | undefined;
}

export type { Pet, PetDetailsProps };