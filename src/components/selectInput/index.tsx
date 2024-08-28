import { FieldError, UseFormRegisterReturn } from "react-hook-form";

function safeString(value: any): string {
    return value? String(value) : '';
};

const SelectInput = <T,>({
    className,
    idRaw,
    idPrefix,
    register,
    editMode,
    options,
    error,
    placeholder,
    idKey,
    valueKey,
    showBorder = false,
}:{
    className: string,
    idPrefix: string,
    idRaw: string,
    register: UseFormRegisterReturn,
    editMode: boolean,
    options: T[],
    error: FieldError | undefined,
    placeholder: string,
    idKey: keyof T,
    valueKey: keyof T,
    showBorder: boolean,
}) => {

    const disabledModeType = showBorder? 'disabled-mode-border' : 'disabled-mode-no-border';
    return (
        <>
            <select
                className={`input ${className} ${editMode ? 'edit-mode' : disabledModeType } ${error? 'input-error' : ''}`}
                id={`${idPrefix}-${idRaw}`}
                aria-label={`${idPrefix}-${idRaw}`}
                {...register}
                disabled={!editMode}
            >
            <option value=''>{placeholder}</option>
            {options.map((option) => (
                <option
                    key={safeString(option[idKey])}
                    value={safeString(option[idKey])}
                >
                    {safeString(option[valueKey])}
                </option>
            ))}
            </select>
            {error && <p className='error-text'>{error.message}</p>}
        </>
    );
};

export default SelectInput;
