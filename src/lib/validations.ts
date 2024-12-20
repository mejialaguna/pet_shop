import { z } from 'zod';

const DEFAULT_PET_IMAGE =
  'https://res.cloudinary.com/jlml/image/upload/v1732854541/shop-with-me/nl7nmglwobqi3thdvoor.jpg';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: 'Owner name is required' })
      .max(100),
    imageUrl: z.union([
      z.literal(''),
      z.string().trim().url({ message: 'Image url must be a valid url eg: https://' }),
    ]),
    age: z.coerce.number().int().positive({message: 'Please add the pet age'}).max(99999),
    notes: z.union([z.literal(''), z.string().trim().max(1000)])
    .refine((value) => value !== '', {
        message: 'this is required eg: likes to play fetch',
      }),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl?.trim() || DEFAULT_PET_IMAGE,
  }));
// the transform method is used to set a default value for the imageUrl field if the user does not provide a value but only works if we use the onSubmit function instead of the action method.

export type TPpetIdSchema = z.infer<typeof petIdSchema>;
export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;
