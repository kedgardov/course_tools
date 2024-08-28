const GrayButton = ({
    className,
    buttonLabel,
    handleAction,
}:{
    className: string,
    buttonLabel: string,
    handleAction: () => void,
}) => {

    return (
        <button
            className={`${className} button-1-gray`}
            type='button'
            onClick={handleAction}
        >
            {buttonLabel}
        </button>
    );
};

export default GrayButton;
