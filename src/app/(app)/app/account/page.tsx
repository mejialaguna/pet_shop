import { redirect } from 'next/navigation';

import { ContentBlock, LogoutButton } from '@/app/components';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  return (
    <main className='mx-7'>
      <h1 className='font-semibold text-2xl leading-6 my-8 text-white'>
        Hello {session.user?.name}
      </h1>
      <ContentBlock additionalClasses='h-[500px] flex flex-col gap-3 justify-center items-center'>
        <p>logged in as {session.user?.email}</p>
        <LogoutButton />
      </ContentBlock>
    </main>
  );
}