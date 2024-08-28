const LoadingTextInputLabel = ({
    className,
    widthLabel,
    widthInput,
}:{
    className: string,
    widthLabel: string,
    widthInput: string
}) => {

    return (
        <div className={`flex flex-col ${className}`}>
            <div className={`input-label-loading ${widthLabel}`}></div>
            <div className={`input-loading ${widthInput}`}></div>
        </div>
    );
};

export default LoadingTextInputLabel;
