'use client';

import { ContentBlock, PetDetails, PetsList, SearchForm, Stats } from "@/app/components";
import { usePetContent } from "@/hooks/usePetContent";

export default function Page() {
  const { pets: petsData, selectedPetId, handleChangeSelectedPetId } = usePetContent();

  return (
    <main className='mx-7'>
      <div className='flex items-center justify-between text-white py-8'>
        <section>
          <h1 className='font-medium text-2xl leading-6'>
            Daycare Pet <span className='font-semibold'>shop</span>
          </h1>
          <p>
            Manage your <span className='font-extrabold'> pet daycare </span>
            with ease and love.
          </p>
        </section>

        <Stats />
      </div>

      <div className='grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]'>
        <div className='md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1'>
          <SearchForm />
        </div>

        <div className='relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 overflow-auto'>
          <ContentBlock>
            <PetsList
              petsData={petsData}
              handleChangeSelectedPetId={handleChangeSelectedPetId}
              selectedPetId={selectedPetId}
            />
          </ContentBlock>
        </div>

        <div className='md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}