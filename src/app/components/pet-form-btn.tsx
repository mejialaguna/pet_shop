'use client';

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function PetFormBtn({ title, isNew }: {title?: string, isNew?: boolean}) {
  // to be able to use the useFormStatus hook, have this button as a child of a form
  const { pending } = useFormStatus();
  return (
    <Button
      variant={'secondary'}
      type='submit'
      className='bg-zinc-300 hover:bg-zinc-400 mt-7'
      disabled={pending}
    >
      {pending ? isNew ? 'Adding...' : 'Updating...' : title}
    </Button>
  );
}