'use client';

import { Label } from '@radix-ui/react-label';
import { useCallback, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

import { login } from '@/actions/user/login';
import { signUpUser } from '@/actions/user/signUp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TformProps {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export default function Form() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const {
      register,
      trigger,
      getValues,
      clearErrors,
      formState: { errors },
    } = useForm<TformProps>();
  
    const Icon = useMemo(
      () => (isPasswordVisible ? FaEye : FaEyeSlash),
      [isPasswordVisible]
    );
  const handleAction = useCallback(async () => {
    const result = await trigger();
    if (!result) return;

    const { email, name, password, confirmPassword } = getValues();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const response = await signUpUser(name, email, password);

    if (!response?.ok) {
      setErrorMessage(response?.message);
      return;
    }

    await login({ email, password });
    window.location.replace('/');

  }, [getValues, trigger]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useFormState(handleAction, undefined);

  return (
    <form action={dispatch} className='space-y-4 mb-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Full Name</Label>
          <Input
            id='name'
            {...register('name', {
              required: 'Please add your name.',
              onChange: () => {
                clearErrors('name');
                setErrorMessage('');
              },
            })}
          />
          {errors.name && (
            <p className='text-red-500 text-xs'>{errors.name.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='email'>email</Label>
          <Input
            id='email'
            {...register('email', {
              required: 'Please add a valid email',
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
              placeholder='*******'
              id='password'
              {...register('password', {
                required: 'This field cant be empty',
                onChange: () => {
                  clearErrors('password');
                  setErrorMessage('');
                },
              })}
            />
          </div>
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='confirmPassword'>Password</Label>
          <Input
            type={`${!isPasswordVisible ? 'password' : 'text'}`}
            placeholder='*******'
            id='confirmPassword'
            {...register('confirmPassword', {
              required: 'This field cant be empty',
              onChange: () => {
                clearErrors('confirmPassword');
                setErrorMessage('');
              },
            })}
          />
          {errors.confirmPassword && (
            <p className='text-red-500 text-xs'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <small className='text-red-600 mb-3'>{errorMessage}</small>
        )}
      </div>
      <SignUpButton />
    </form>
  );
}

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
        type='submit'
        variant={'secondary'}
        className='text-sm text-white font-extrabold hover:text-stone-100
        w-full bg-gradient-to-br from-orange-200 to-orange-500 hover:scale-105 transition-all'
      disabled={pending}
      >
        Sign up
      </Button>
  );
};
