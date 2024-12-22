import { ContentBlock, LogoutButton } from '@/app/components';
import { isLoggedIn } from '@/lib/actionsUtils';

export default async function Page() {
  const session = await isLoggedIn()

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