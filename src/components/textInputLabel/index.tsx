import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputLabel from "../inputLabel";
import TextInput from "../textInput";

const TextInputLabel = ({
    className,
    idPrefix,
    idRaw,
    label,
    helpText,
    editMode,
    register,
    placeholder,
    error,
    showBorder,
}:{
    className: string,
    idPrefix: string,
    idRaw: string,
    label:string,
    helpText: string,
    editMode: boolean,
    register: UseFormRegisterReturn,
    placeholder: string,
    error: FieldError | undefined,
    showBorder: boolean,
}) => {

    return (
        <div className={`${className} flex flex-col`}>
            <InputLabel
                idPrefix={idPrefix}
                idRaw={idRaw}
                label={label}
                helpText={helpText}
            />
            <TextInput
                className=''
                idPrefix={idPrefix}
                idRaw={idRaw}
                register={register}
                editMode={editMode}
                placeholder={placeholder}
                error={error}
                showBorder={showBorder}
            />
        </div>
    );
};

export default TextInputLabel;
