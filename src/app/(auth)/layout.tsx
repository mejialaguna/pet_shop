
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-400'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all'>
        {children}
      </div>
    </div>
  );
}