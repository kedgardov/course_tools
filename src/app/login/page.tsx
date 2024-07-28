'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginForm_t } from '../../models/forms/login';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import { ExclamationTriangleIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Login: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<loginForm_t>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<loginForm_t> = (data) => {
      console.log('Form Data on Submit:', data);
    };

    return (
        <div
            className='flex flex-col items-center flex-grow bg-gradient-radial from-primary to-blue-500 justify-center'
            onSubmit={handleSubmit(onSubmit)}
        >
            <form aria-label = 'login-form' className='flex flex-col h-[25rem] p-4 rounded-md bg-gradient-radial from-light to-light_highlight shadow-xl'>
            <div className='flex flex-col items-center text-dark'>
                <AcademicCapIcon className='size-24'/>
                <h1 className='uppercase text-2xl font-bold'>Course Tools</h1>
            </div>
            <div className={`m-2 flex items-center bg-light border rounded-2xl shadow p-2 ${errors.username? 'border-secondary border-2' : 'border-gray-300'}`}>
            <UserIcon className={`size-5 ${errors.username? 'text-secondary' : 'text-dark' }`}/>
                <input
                    className='px-2 text-dark bg-light focus:outline-none'
                    id='usuario'
                    type='text'
                    autoComplete='username'
                    placeholder='Usuario'
                    aria-label='Usuario'
                    aria-invalid={errors.username ? "true" : "false"}
                    { ...register('username') }
                >
                </input>
            </div>
            {errors.username &&
                <div className='flex justify-end text-secondary items-center'>
                    <ExclamationTriangleIcon className='size-5' style={{strokeWidth: 2}}/>
                    <p className='mx-1 italic'>{errors.username.message}</p>
                </div>}
            <div className={`m-2 flex items-center bg-light border rounded-2xl shadow p-2 ${errors.password? 'border-secondary border-2' : 'border-gray-300'}`}>
            <LockClosedIcon className={`size-5 ${errors.username? 'text-secondary' : 'text-dark' }`}/>
                <input
                    className='px-2 text-dark bg-light focus:outline-none'
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Contraseña'
                    aria-label='Contraseña'
                    aria-invalid={errors.password ? "true" : "false"}
                    { ...register('password') }
                >
                </input>
            </div>
            {errors.password &&
                <div className='flex justify-end text-secondary items-center'>
                    <ExclamationTriangleIcon className='size-5' style={{strokeWidth: 2}}/>
                    <p className='mx-1 italic'>{errors.password.message}</p>
                </div>}
            <button
                className='border uppercase font-bold rounded-2xl p-2 m-2 mb-4 border-gray-300 bg-light shadow-xl mt-auto'
                type='submit'
            >
            Iniciar Sesion
            </button>
        </form>
        </div>
    );

}

export default Login;
