'use client';

import { Label } from '@radix-ui/react-label';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


interface TformProps {
  username: string;
  password: string;
}

export default function Form() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TformProps>();

  const Icon = useMemo(
    () => (isPasswordVisible ? FaEye : FaEyeSlash),
    [isPasswordVisible]
  );

  const handleAction = useCallback(async () => {
    const result = await trigger();
    if (!result) return;

    getValues();
  }, [getValues, trigger]);

  return (
    <form action={handleAction} className='mb-6 space-y-3'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='username'>Username</Label>
          <Input
            id='username'
            {...register('username', {
              required: 'Please add a valid userName',
            })}
          />
          {errors.username && (
            <p className='text-red-500 text-xs'>{errors.username.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <div className='flex relative'>
            <Icon
              className='absolute right-5 top-3'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
            <Input
              type={`${!isPasswordVisible ? 'password' : 'text'}`}
              id='password'
              {...register('password', {
                required: 'This field can be empty',
              })}
            />
          </div>
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
        </div>
      </div>
      <Button
        type='submit'
        variant={'secondary'}
        // onClick={() => setIsSignUp(!isSignUp)}
        className='text-sm text-white font-extrabold hover:text-stone-100
        w-full bg-gradient-to-br from-orange-200 to-orange-500
        hover:scale-105 transition-all'
      >
        Sign in
      </Button>
    </form>
  );
}
