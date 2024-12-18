
export default function ContentBlock({children}: {children: React.ReactNode}) {
  return (
    <div className='bg-[#F8F8FA] shadow-md rounded-md overflow-scroll h-full w-full scrollbar-hide'>
      {children}
    </div>
  );
}