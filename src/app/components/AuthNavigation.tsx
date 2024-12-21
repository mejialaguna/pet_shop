import Link from 'next/link';
import { useMemo } from 'react';

export default function AuthNavigation({pathName = 'login'}: {pathName?: string}) {
  const isLogin = useMemo(() => pathName.startsWith('login'), [pathName])

  return (
    <div className='mt-6 text-center'>
      <Link
        className='text-sm text-purple-600 hover:text-purple-800 transition-colors'
        href={`${isLogin ? '/signup' : '/login'}`}
      >
        {!isLogin
          ? 'Already have an account? Sign in'
          : 'Need an account? Sign up'}
      </Link>
    </div>
  );
}