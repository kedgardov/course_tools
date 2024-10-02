import { cookies } from 'next/headers';
import NavbarClient from './navbar';

const Navbar = ({ className }: { className: string }) => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    return (
        <NavbarClient
            className={className}
            token={token}
        />
    );
};

export default Navbar;
