import cuid from 'cuid';

import { Pet } from '@/interfaces/Pet';

export const users = [
  {
    id: cuid(),
    name: 'Jane Smith',
    userName: 'janesmith',
    email: 'jane@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'Morgan Lee',
    userName: 'morganlee',
    email: 'morgan@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'Chris Johnson',
    userName: 'chrisjohnson',
    email: 'chris@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'Jamie Green',
    userName: 'jamiegreen',
    email: 'jamie@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'Alex Kim',
    userName: 'alexkim',
    email: 'alex@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'Toni Parker',
    userName: 'toniparker',
    email: 'toni@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'Jordan Brown',
    userName: 'jordanbrown',
    email: 'jordan@example.com',
    password: '',
  },
  {
    id: cuid(),
    name: 'John Doe',
    userName: 'johndoe',
    email: 'john@example.com',
    password: '',
  },
];

export const initialData: Pet[] = [
  {
    id: cuid(),
    name: 'Rocky',
    ownerName: 'Jane Smith',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630651/pet-store/opxzout51ehr1afyop8b.png',
    age: 13,
    notes: 'Loves playing fetch.',
  },
  {
    id: cuid(),
    name: 'Bella',
    ownerName: 'Morgan Lee',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630650/pet-store/fye9m15ievvm3x3h5cmb.png',
    age: 2,
    notes: 'Shy but warms up quickly.',
  },
  {
    id: cuid(),
    name: 'Lucy',
    ownerName: 'Chris Johnson',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630649/pet-store/f7fx8zovbm0gbwwsk2kw.png',
    age: 14,
    notes: 'Needs a special diet.',
  },
  {
    id: cuid(),
    name: 'Evelyn',
    ownerName: 'Chris Johnson',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630649/pet-store/ezwpgztefdlxgjn8lyvr.png',
    age: 13,
    notes: 'Great with other pets.',
  },
  {
    id: cuid(),
    name: 'Milo',
    ownerName: 'Jamie Green',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630649/pet-store/e6ssifip7txbw6vcnmfs.png',
    age: 7,
    notes: 'Great with other pets.',
  },
  {
    id: cuid(),
    name: 'Luna',
    ownerName: 'Alex Kim',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630649/pet-store/yvwle0nsrkqxxcrgccgi.png',
    age: 15,
    notes: 'Enjoys long walks in the park.',
  },
  {
    id: cuid(),
    name: 'Leon Scanor',
    ownerName: 'Toni Parker',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630648/pet-store/b3o0rbaerf9wcydreuil.png',
    age: 13,
    notes: 'Afraid of thunderstorms.',
  },
  {
    id: cuid(),
    name: 'Mia',
    ownerName: 'Jordan Brown',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630648/pet-store/cxmoq9nda1juwn9a3ile.png',
    age: 9,
    notes: 'Very friendly with kids.',
  },
  {
    id: cuid(),
    name: 'Charlie',
    ownerName: 'John Doe',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630578/pet-store/ooo1jpn8ocqevmnr8w8n.webp',
    age: 7,
    notes: 'Afraid of thunderstorms.',
  },
  {
    id: cuid(),
    name: 'Michael',
    ownerName: 'Morgan Lee',
    imageUrl:
      'https://res.cloudinary.com/jlml/image/upload/v1734630578/pet-store/agpf7vtl2thfttfpbkkr.webp',
    age: 12,
    notes: 'Shy but warms up quickly.',
  },
];