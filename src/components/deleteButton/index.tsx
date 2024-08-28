import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Confirm from '../confirm';

const DeleteButton = ({
    className,
    handleDelete,
    title,
}: {
    className: string,
    handleDelete: () => void,
    title: string,
}) => {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const onDelete = () => {
        setShowConfirm(true);
    };

    const proceedWithDelete = () => {
        handleDelete();
        setShowConfirm(false);
    };

    return (
        <>
            <button
                title={title}
                className={`${className}`}
                onClick={onDelete}
                type="button"
            >
                <TrashIcon className="delete-icon" />
            </button>
            <Confirm
                showConfirm={showConfirm}
                text="¿Eliminar el Elemento?"
                accept={proceedWithDelete}
                reject={() => setShowConfirm(false)}
            />
        </>
    );
};

export default DeleteButton;
