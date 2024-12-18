import { AppFooter, AppHeader, AppToppper } from "../components";

export default function AppLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
      <AppToppper />
      <div className='flex flex-col max-w-[1000px] mx-auto min-h-screen'>
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}