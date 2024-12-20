import { getPets } from '@/actions/pets';
import { Toaster } from '@/components/ui/toaster';
import PetContextProvider from '@/context/pet-context-provider';
import SearchContextProvider from '@/context/search-context-provider';
import { Pet } from '@/interfaces/Pet';

import { AppFooter, AppHeader, AppToppper } from '../../components';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {ok, pets} = await getPets();
  const petsDataResponse: Pet[] = pets;

  if (!ok) {
    throw new Error('Failed to fetch pets data');
  }

  return (
    <>
      <AppToppper />
      <div className='flex flex-col max-w-[1000px] mx-auto min-h-screen'>
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={petsDataResponse}>
            {children}
          </PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster />
    </>
  );
}
