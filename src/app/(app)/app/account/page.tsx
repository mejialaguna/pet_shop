import { ContentBlock } from '@/app/components';

export default function Page() {
  return (
    <main className='mx-7'>
      <h1 className='font-semibold text-2xl leading-6 my-8 text-white'>
        Hello Account Page
      </h1>
      <ContentBlock additionalClasses='h-[500px] flex flex-col gap-3 justify-center items-center'>
        <p>logged in as.... ===</p>
      </ContentBlock>
    </main>
  );
}