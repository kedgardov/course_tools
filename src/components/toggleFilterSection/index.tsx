import { useState, ReactNode } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

const ToggleFilterSection = ({
    title,
    children,
    initialShow,
}:{
    title: string,
    children: ReactNode,
    initialShow: boolean,
}) => {
    const [isShown, setIsShown] = useState(initialShow);

    return (
        <section>
            <button onClick={() => setIsShown(prev => !prev)} className='mx-2 space-x-2 flex items-center'>
                <FunnelIcon className='h-6 w-6 stroke-2'/>
                <h2 className='title-2 mx-2'>{title}</h2>
            </button>
            <div className={`divider-dark mb-2 overflow-hidden transition-all ease-in-out duration-500 ${!isShown ? 'max-h-0' : 'max-h-80'}`}>
                {children}
            </div>
        </section>
    );
};

export default ToggleFilterSection;
