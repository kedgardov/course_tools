const SecondarySubmit = ({
    className,
    buttonLabel,
    isDirty,
}:{
    className: string,
    buttonLabel: string,
    isDirty: boolean,
}) => {

    return (
        <button
            className={`${className} button-1-secondary`}
            type='submit'
            disabled={!isDirty}
        >
            {buttonLabel}
        </button>
    );
};

export default SecondarySubmit;
