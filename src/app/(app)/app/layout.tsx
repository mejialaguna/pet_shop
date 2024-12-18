import PetContextProvider from '@/context/pet-context-provider';
import { AppFooter, AppHeader, AppToppper } from '../../components';
import { Pet } from '@/interfaces/Pet';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const petsDataResponse = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  );

  if (!petsDataResponse.ok) {
    throw new Error('Failed to fetch pets data');
  }

  const petsData: Pet[] = await petsDataResponse.json();

  return (
    <>
      <AppToppper />
      <div className='flex flex-col max-w-[1000px] mx-auto min-h-screen'>
        <AppHeader />
        <PetContextProvider data={petsData}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
