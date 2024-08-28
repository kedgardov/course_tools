import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const TextInput = ({
    className,
    idPrefix,
    idRaw,
    editMode,
    register,
    placeholder,
    error,
    showBorder = false,
}:{
    className: string,
    idPrefix: string,
    idRaw: string,
    editMode: boolean,
    register: UseFormRegisterReturn,
    placeholder: string,
    error: FieldError | undefined,
    showBorder: boolean,
}) => {

    const disabledModeType = showBorder? 'disabled-mode-border' : 'disabled-mode-no-border';

    return (
        <>
            <input
                className={`input ${className} ${editMode ? 'edit-mode' : disabledModeType} ${error? 'input-error' : ''}`}
                id={`${idPrefix}-${idRaw}`}
                aria-label={`${idPrefix}-${idRaw}`}
                placeholder={placeholder}
                {...register}
                disabled={!editMode}
            />
            {error && <p className='error-text'>{error.message}</p>}
        </>
    );
};

export default TextInput;
