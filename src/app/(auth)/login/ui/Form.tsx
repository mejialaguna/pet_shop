'use client';

import { Label } from '@radix-ui/react-label';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

import { login } from '@/actions/user/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TAuth } from '@/lib/validations';

export default function Form() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    trigger,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<TAuth>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/app/dashboard';
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const Icon = useMemo(
    () => (isPasswordVisible ? FaEye : FaEyeSlash),
    [isPasswordVisible]
  );

  const handleAction = useCallback(async () => {
    const result = await trigger();
    if (!result) return;

    const data = getValues();
    const { ok, message } = await login(data);

    if (!ok) {
      setErrorMessage(message);
    }

    if (callbackUrl) router.push(callbackUrl);

  }, [callbackUrl, getValues, router, trigger]);

  return (
    <form action={handleAction} className='mb-6 space-y-3'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            autoFocus
            id='email'
            {...register('email', {
              required: 'Please add a valid Email',
              onChange: () => {
                clearErrors('email');
                setErrorMessage('');
              },
            })}
          />
          {errors.email && (
            <p className='text-red-500 text-xs'>{errors.email.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <div className='flex relative'>
            <Icon
              className='absolute right-5 top-3 cursor-pointer'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
            <Input
              type={`${!isPasswordVisible ? 'password' : 'text'}`}
              id='password'
              placeholder='*******'
              {...register('password', {
                required: 'This field cant be empty',
                onChange: () => {
                  clearErrors('password');
                  setErrorMessage('');
                },
              })}
            />
          </div>
          {(errors?.password || errorMessage) && (
            <p className='text-red-500 text-xs'>
              {errors?.password?.message || errorMessage}
            </p>
          )}
        </div>
      </div>
      <Button
        type='submit'
        variant={'secondary'}
        className='text-sm text-white font-extrabold hover:text-stone-100
        w-full bg-gradient-to-br from-orange-200 to-orange-500
        hover:scale-105 transition-all'
      >
        Sign in
      </Button>
    </form>
  );
}
