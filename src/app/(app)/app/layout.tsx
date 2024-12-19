import PetContextProvider from '@/context/pet-context-provider';
import { AppFooter, AppHeader, AppToppper } from '../../components';
import { Pet } from '@/interfaces/Pet';
import SearchContextProvider from '@/context/search-context-provider';
import { initialData } from '../../../../public/seed/seed';


export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const petsDataResponse: Pet[] = initialData;

  // if (!petsDataResponse.ok) {
  //   throw new Error('Failed to fetch pets data');
  // }

  if (!initialData?.length) {
    throw new Error('Failed to fetch pets data');
  }

  // const petsData: Pet[] = await petsDataResponse.json();

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
    </>
  );
}
