interface Pet {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
}

type PetEssentials = Omit<Pet, 'id' | 'userId'>;

interface PetDetailsProps {
  selectedPet: Pet | null | undefined;
}

export type { Pet, PetDetailsProps, PetEssentials };