import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function page() {
  const sharedStyles = 'rounded-full h-10 px-6';
  return (
    <main
      className='bg-gradient-to-br from-orange-400 via-orange-500 to-orange-400
    min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 py-10'
    >
      <Image
        src={
          'https://res.cloudinary.com/jlml/image/upload/v1735072274/pet-store/c9f4szeqltnpqsggotjd.png'
        }
        alt={'logo'}
        width={520}
        height={480}
        sizes='300px'
        className='rounded-3xl mr-5'
      />
      <div>
        <h1 className='text-5xl font-semibold my-6 max-w-[500px]'>
          Manage your <span className='font-extrabold'> pet daycare</span> with
          ease and love.
        </h1>
        <p className='text-2xl font-medium max-w-[600px]'>
          Keep Your Pets Happy and Safe with PetCare! Effortlessly manage and
          track all your furry friends with the PetCare Daycare App. Get
          lifetime access for just $199.99 and enjoy peace of mind knowing your
          pets are always well cared for!.
        </p>
        <div className='mt-10 space-x-3'>
          {/* adding the add child prop for better accessibility, it will render the anchor tag directly instead of the button */}
          <Button className={sharedStyles} asChild>
            <Link href={'/signup'}>Get started</Link>
          </Button>
          <Button className={sharedStyles} variant={'secondary'} asChild>
            <Link href={'/login'}>Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
