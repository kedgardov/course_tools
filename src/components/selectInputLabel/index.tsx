import SelectInput from '@components/selectInput';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import InputLabel from '../inputLabel';


const SelectInputLabel = <T,>({
    className,
    idPrefix,
    idRaw,
    label,
    helpText,
    register,
    editMode,
    options,
    error,
    placeholder,
    idKey,
    valueKey,
    showBorder,
}:{
    className: string,
    idPrefix: string,
    idRaw: string,
    label: string,
    helpText: string,
    register: UseFormRegisterReturn,
    editMode: boolean,
    options: T[],
    error: FieldError | undefined,
    placeholder: string,
    idKey: keyof T,
    valueKey: keyof T,
    showBorder: boolean,
}) => {

    return (
        <div className={`flex flex-col ${className}`}>
            <InputLabel
                idPrefix={idPrefix}
                idRaw={idRaw}
                label={label}
                helpText={helpText}
            />
            <SelectInput <T>
                className=''
                idPrefix={idPrefix}
                idRaw={idRaw}
                register={register}
                editMode={editMode}
                options={options}
                error={error}
                placeholder={placeholder}
                idKey={idKey}
                valueKey={valueKey}
                showBorder={showBorder}
            />
        </div>
    );
};

export default SelectInputLabel;
