'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import { ExclamationTriangleIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signInSchema, signInType } from '@/models/signIn';
import { useState } from 'react';
import Alert from '@components/alert';
import { login } from '@utils/session/login';

const Login = (): React.JSX.Element => {


    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<signInType>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<signInType> = async (credentials) => {
        const response = await login(credentials);
        if (response.success) {
            sessionStorage.setItem('labelDocente',response.label);
            router.refresh();
        } else {
            setServerError(response.message);
        }
    };

    return (
        <div className='flex flex-col items-center flex-grow bg-gradient-radial from-primary to-primary-light justify-center text-dark'>
            <main className='flex flex-col h-[35rem] w-[25rem] p-4 rounded-md bg-gradient-radial from-gray-100 to-more-light shadow-xl items-center'>
                <AcademicCapIcon className='h-2/5 flex-grow text-dark' />
                <form className='flex flex-col flex-grow items-center w-full h-3/5' onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className='p-2 flex flex-col w-full h-3/4'>
                        <legend className='uppercase text-4xl font-bold w-full text-center'>Course Tools</legend>
                        <div className='m-2'>
                            <div className={`flex items-center bg-more-light border rounded-2xl shadow p-2 ${errors.username ? 'border-tertiary border-2' : 'border-gray-300'}`}>
                                <UserIcon className={`size-5 ${errors.username ? 'text-tertiary' : ''}`} />
                                <input
                                    className='px-2 text-xl bg-more-light  focus:outline-none'
                                    id='usuario'
                                    type='text'
                                    autoComplete='username'
                                    placeholder='Usuario'
                                    aria-label='Usuario'
                                    {...register('username')}
                                >
                                </input>
                            </div>
                            {errors.username &&
                                <div className='flex justify-end text-tertiary items-center'>
                                    <ExclamationTriangleIcon className='size-5' style={{ strokeWidth: 2 }} />
                                    <p className='mx-1 italic'>{errors.username.message}</p>
                                </div>}
                        </div>
                        <div className='m-2'>
                            <div className={`flex items-center bg-more-light border rounded-2xl shadow p-2 ${errors.password ? 'border-tertiary border-2' : 'border-gray-300'}`}>
                                <LockClosedIcon className={`size-5 ${errors.password ? 'text-tertiary' : ''}`} />
                                <input
                                    className='px-2 text-xl bg-more-light focus:outline-none'
                                    id='password'
                                    type='password'
                                    autoComplete='current-password'
                                    placeholder='Contraseña'
                                    aria-label='Contraseña'
                                    {...register('password')}
                                >
                                </input>
                            </div>
                            {errors.password &&
                                <div className='flex justify-end text-tertiary items-center'>
                                    <ExclamationTriangleIcon className='size-5' style={{ strokeWidth: 2 }} />
                                    <p className='mx-1 italic'>{errors.password.message}</p>
                                </div>}
                        </div>
                    </fieldset>
                    <button
                        className='border text-xl uppercase font-bold rounded-2xl p-2 px-4 border-gray-300 bg-more-light shadow-xl'
                        type='submit'
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <Alert error={serverError} setError={setServerError}/>
            </main>
        </div>
    );
};

export default Login;
