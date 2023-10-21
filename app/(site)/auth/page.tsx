'use client';

import { useState, useEffect, FC, useCallback } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button, AuthSocialButton } from '../components';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { AuthVariant } from '@/app/interfaces/types';
import AuthInputFields from '@/app/constants/authInputFields';
import axios from 'axios';
import AxiosService from '@/services/AxiosService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const AuthForm: FC = () => {

  const [variant, setVariant] = useState<AuthVariant>('REGISTER');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const token = useSelector((state: RootState) => state.initializeAuth.authToken);

  const toggleVariant = useCallback(() => {
    const v = variant === 'LOGIN' ? 'REGISTER' : 'LOGIN';
    setVariant(v);
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/session/customer-sign-in`

    const loginBody = {
      autoRegister: true,
      login: data.email,
      password: data.password,
    }

    if (variant === 'REGISTER') {
      const registerBody = {
        ...loginBody,
        confirmPassword: data.confirmPassword
      };
      axios
        .post(url, registerBody, { headers })
        .then((response) => { toast.success('You signed up!'); setVariant('LOGIN'); })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Invalid credentials.');
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      axios
        .post(url, loginBody, { headers })
        .then(async (response) => {
          if (response.status === 200) {
            await signIn('credentials', {
              ...data,
              redirect: false,
            });
            toast.success('You logged in!');
            router.push('/');
          } else {
            console.error('Error:', response.data);
            toast.error('Invalid credentials.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Something went wrong.');
        })
        .finally(() => setIsLoading(false));
    }
  }

  const displayComponents = useCallback((node: HTMLElement) => {
    if (!node) return;
    ['header', 'footer'].forEach((tag) => document.getElementsByTagName(tag)[0].style.display = 'none');
  });

  return !token
    ? <div>You need to get auth token to access this page.</div>
    : (
      <div className="flex" ref={displayComponents}>
        {/* Image */}
        <div className={`relative hidden w-1/2 md:flex row ${variant !== 'REGISTER' ? 'bg-red-600' : ''}`}>
          <Image
            alt="Logo"
            height="400"
            width="400"
            className="h-1/2 w-3/5"
            src={`/assets/images/${variant === 'REGISTER' ? 'signup' : 'login'}.png`}
          />
        </div>
        {/* Form */}
        <div className="flex w-full md:w-1/2 min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image height="96" width="96" alt="Logo" className="mx-auto block md:hidden" src={`/assets/images/${variant === 'REGISTER' ? 'signup' : 'login'}.png`} />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              {variant === 'REGISTER' ? 'Sign up' : 'Log in'}
            </h2>
            {variant === 'REGISTER' && <h5 className='mx-auto text-sm text-center t-gray'>Enter your details to get started</h5>}
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {AuthInputFields.map((field) => (
                  (!field.showOnRegister || variant === 'REGISTER') && (
                    <Input
                      key={field.id}
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      {...field}
                      label={variant === 'REGISTER' && field.id === 'confirm-password' ? 'Confirm Password' : field.label}
                    />
                  )
                ))}
                <div>
                  <Button disabled={isLoading} isFullWidth isSignUp={variant === 'REGISTER'} type="submit">
                    {variant === 'LOGIN' ? 'Log in' : 'Sign up'}
                  </Button>
                </div>
              </form>
              <div className="row-h gap-2 text-sm mt-6 px-2 text-gray-500">
                <div>
                  {variant === 'LOGIN' ? 'New to this website?' : 'Already have an account?'}
                </div>
                <div
                  onClick={toggleVariant}
                  className={`pointer ${variant === 'LOGIN' ? 'text-sky-500 hover:text-sky-600' : 'text-red-500 hover:text-red-600'}`}
                >
                  {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AuthForm;
