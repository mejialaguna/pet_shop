'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';

import { createCheckoutSession } from '@/actions/paymentAction/createCheckOutSession';
import { Button } from '@/components/ui/button';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className='min-h-screen flex flex-col items-center justify-center space-y-6'>
      <Image
        src={
          'https://res.cloudinary.com/jlml/image/upload/v1734768828/pet-store/tueyxpd40xi3xmtkp1ah.webp'
        }
        alt={'logo'}
        width={50}
        height={50}
        sizes='100px'
        className='rounded-full'
      />
      <h1>PetSoft access requires payment</h1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            // we need to update the jwt token after success full payment
            await update(true);
            router.push('/app/dashboard');
          }}
          disabled={status === 'loading' || session?.user.hasAccess}
        >
          Access PetSoft
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}

      {searchParams.success && (
        <p className='text-sm text-green-700'>
          Payment successful! You now have lifetime access to PetSoft.
        </p>
      )}
      {searchParams.cancelled && (
        <p className='text-sm text-red-700'>
          Payment cancelled. You can try again.
        </p>
      )}
    </main>
  );
}
