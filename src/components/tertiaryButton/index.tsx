const TertiaryButton = ({
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
            className={`${className} button-1-tertiary`}
            type='button'
            onClick={handleAction}
        >
            {buttonLabel}
        </button>
    );
};

export default TertiaryButton;
