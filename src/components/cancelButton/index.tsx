const CancelButton = ({
    className,
    handleCancel,
}:{
    className: string,
    handleCancel: () => void,
}) => {
    return (
        <button
            className={`button-1-gray ${className}`}
            onClick={handleCancel}
            type='button'
        >
            Cancelar
        </button>
    );
};

export default CancelButton;
