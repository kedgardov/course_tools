'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logout } from '@utils/session/logout';
import { UserIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = ({ className }: { className: string }) => {
    const router = useRouter();
    const [label, setLabel] = useState<string>('Cargando...');

    useEffect(() => {
        const storedLabel = sessionStorage.getItem('labelDocente') || '';
        setLabel(storedLabel);
    }, []);

    const handleLogout = async () => {
        try {
            console.log('logging out');
            const response = await logout();

            if (response.success) {
                console.log('logged out');
                router.push('/login');
            } else {
                console.error('Logout error:', response.message);
                // Optionally, show an error notification to the user
            }
        } catch (error) {
            console.error('Unexpected error during logout:', error);
            // Optionally, show an error notification to the user
        }
    };

    return (
        <div className='shadow z-10'>
            <nav className={`${className} flex items-center p-2 text-dark-2 font-bold`}>
                <UserIcon className='size-[1.25rem]' />
                <span className='px-1'>{label}</span>
                <button
                    onClick={handleLogout}
                    className='ml-auto mr-2 flex items-center'
                    aria-label="Cerrar Sesión"
                >
                    <ArrowLeftOnRectangleIcon className='size-6' />
                    <span>Cerrar Sesión</span>
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
