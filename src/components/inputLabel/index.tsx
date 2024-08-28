import { InformationCircleIcon } from "@heroicons/react/24/outline";


const InputLabel = ({
    idPrefix,
    idRaw,
    label,
    helpText,
}:{
    idPrefix: string,
    idRaw: string,
    label: string,
    helpText: string,
}) => {

    return (
        <div className='input-label-container'>
            <label
                className='input-label'
                htmlFor={`${idPrefix}-${idRaw}`}
            >
                {label}
            </label>
            {helpText !== '' && (
            <InformationCircleIcon
                className='help-icon'
                title={helpText}
            />
            )}
        </div>
    );
};

export default InputLabel;
