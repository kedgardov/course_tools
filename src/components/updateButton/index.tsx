import { ArrowPathIcon } from '@heroicons/react/24/outline'

const UpdateButton = ({
    className,
    handleUpdate,
    title,
}:{
    className: string,
    handleUpdate: () => void,
    title: string,
}) => {

    return (
        <button
            title={title}
            className={`${className} `}
            onClick={handleUpdate}
            type='button'
        >
            <ArrowPathIcon className='update-icon'/>
        </button>
    );
};

export default UpdateButton;
