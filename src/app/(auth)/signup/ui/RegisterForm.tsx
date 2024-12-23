import Image from 'next/image';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthNavigation, SocialButton } from '@/app/components';

import Form from './Form';
import logo from '../../../icon.svg';

export const RegisterForm = () => {
  return (
    <>
      <div className='flex flex-col items-center space-y-3 mb-6'>
        <Image src={logo} alt='Logo' width={80} height={80} />
        <h2 className='text-3xl font-bold text-center text-gray-800'>
          Welcome back
        </h2>
      </div>
      <Form />
      <div className='space-y-4'>
        {/* <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>
              Or continue with
            </span>
          </div>
        </div> */}
        {/* <SocialButton
          provider='google'
          // onClick={() => handleSocialLogin('google')}
        />
        <SocialButton
          provider='github'
          // onClick={() => handleSocialLogin('github')}
        /> */}
      </div>
      <AuthNavigation
        pathName={'/login'}
        label={'Already have an account? Sign in'}
      />
    </>
  );
};
