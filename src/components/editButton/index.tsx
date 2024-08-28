import { PencilSquareIcon } from '@heroicons/react/24/outline'

const EditButton = ({
    className,
    handleEdit,
    title,
}:{
    className: string,
    handleEdit: () => void,
    title: string,
}) => {

    return (
        <button
            title={title}
            className={`${className} `}
            onClick={handleEdit}
            type='button'
        >
            <PencilSquareIcon className='edit-icon'/>
        </button>
    );
};

export default EditButton;
