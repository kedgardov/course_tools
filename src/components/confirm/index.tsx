'use client';

import GrayButton from "@components/grayButton";
import TertiaryButton from '@components/tertiaryButton';

const Modal = ({
    message,
    accept,
    reject,
}: {
    message: string,
    accept: () => void,
    reject: () => void,
}) => {
    return (
        <div className="bg-gradient-radial from-light to-more-light p-4 rounded-md shadow-md w-80">
            <h2 className="text-xl font-bold mb-2 text-dark">Confirmacion</h2>
            <p className="text-dark">{message}</p>
            <div className="flex mt-4">
                <TertiaryButton
                    className="w-1/2 mr-2"
                    handleAction={() => accept()}
                    buttonLabel="Eliminar"
                />
                <GrayButton
                    className='w-1/2 mr-2'
                    handleAction={() => reject()}
                    buttonLabel='Cancelar'
                />
            </div>
        </div>
    );
};

const Confirm = ({
    text,
    showConfirm,
    accept,
    reject,
}: {
    text: string,
    showConfirm: boolean,
    accept: () => void,
    reject: () => void,
}) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out ${
                showConfirm ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <Modal message={text} accept={accept} reject={reject} />
        </div>
    );
};

export default Confirm;
