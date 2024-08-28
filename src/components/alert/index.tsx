'use client'
import { useEffect } from 'react';

const Modal = ({ message, onClose }: { message: string, onClose: () => void }): React.JSX.Element => {

    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (

            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{message}</p>
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>

    );
};

const Alert = ({error, setError}:{error:string | null, setError: (error: string|null) => void}) => {

    return (
        <div className='fixed bottom-4 right-4 overflow-hidden'>
            <div className={`transition-transform duration-500 ease-in-out ${error? '' : 'translate-y-full'}`}>
                {error && (
                    <Modal message={error} onClose={() => setError(null)} />
                )}
            </div>
        </div>

    );
};

export default Alert;
