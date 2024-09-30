import React from 'react';
import { Controller, FieldError } from "react-hook-form";
import Select from 'react-select';

function safeString(value: any): string {
    return value ? String(value) : '';
};

const ReactSelectInput = <T,>({
    className,
    idRaw,
    idPrefix,
    control,
    editMode,
    options,
    error,
    placeholder,
    idKey,
    valueKey,
    showBorder = false,
}: {
    className: string,
    idPrefix: string,
    idRaw: string,
    control: any,  // We'll use control from react-hook-form for react-select
    editMode: boolean,
    options: T[],
    error: FieldError | undefined,
    placeholder: string,
    idKey: keyof T,
    valueKey: keyof T,
    showBorder: boolean,
}) => {

    const disabledModeType = showBorder ? 'disabled-mode-border' : 'disabled-mode-no-border';

    // Map options for react-select
    const selectOptions = options.map((option) => ({
        value: safeString(option[idKey]),
        label: safeString(option[valueKey]),
    }));

    return (
        <>
            <Controller
                name={`${idPrefix}-${idRaw}`}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={selectOptions}
                        placeholder={placeholder}
                        classNamePrefix={editMode ? 'react-select' : disabledModeType}
                        isDisabled={!editMode}
                        className={`${className} ${error ? 'input-error' : ''}`}
                    />
                )}
            />
            {error && <p className='error-text'>{error.message}</p>}
        </>
    );
};

export default ReactSelectInput;
