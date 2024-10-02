'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '@utils/session/logout';
import { UserIcon } from '@heroicons/react/24/solid';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';

// Define the structure of your token
interface DecodedToken {
    label?: string;  // Mark as optional since it might be missing
}

const NavbarClient = ({
    className,
    token,
}: {
    className: string,
    token: string,
}) => {
    const router = useRouter();

    // Decode the token and assert its type
    const decodedToken = jwtDecode<DecodedToken>(token);
    const [label, setLabel] = useState<string>('Cargando...');

    useEffect(() => {
        if (decodedToken && decodedToken.label) {
            setLabel(decodedToken.label);  // Safely access the label field
        } else {
            //setLabel('No label found');
        }
    }, [decodedToken]);

    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response.success) {
                router.refresh();
            } else {
                // Optionally, show an error notification to the user
            }
        } catch (error) {
            //console.error('Unexpected error during logout:', error);
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
                    <ArrowLeftStartOnRectangleIcon className='size-6' />
                    <span>Cerrar Sesión</span>
                </button>
            </nav>
        </div>
    );
};

export default NavbarClient;
