'use client';
import { FunnelIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { FieldError, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import Fuse from 'fuse.js';
import SelectInput from '../selectInput';

function safeString(value: any): string {
    return value ? String(value) : '';
}

const SelectInputFilter = <T,>({
    className,
    idRaw,
    idPrefix,
    register,
    setValue,
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
    register: UseFormRegisterReturn,
    setValue: UseFormSetValue<any>,
    editMode: boolean,
    options: T[],
    error: FieldError | undefined,
    placeholder: string,
    idKey: keyof T,
    valueKey: keyof T,
    showBorder: boolean,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`${className} flex`}>
            <SelectInput <T>
                className='flex-grow'
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
            {/* Filter button */}
            {editMode && (<button
                type="button"
                onClick={() => setIsModalOpen(true)}
            >
                <FunnelIcon className='size-6 mx-2'/>
            </button>
            )}

            {/* Modal for filtering */}
            {isModalOpen && (
                <FilteringModal <T>
                    options={options}
                    idKey={idKey}
                    valueKey={valueKey}
                    setValue={setValue}
                    selfDestruct={() => setIsModalOpen(false)}
                    inputFieldName={register.name}
                />
            )}
        </div>
    );
};

export default SelectInputFilter;


const FilteringModal = <T,> ({
    options,
    idKey,
    valueKey,
    setValue,
    selfDestruct,
    inputFieldName,
}:{
    options: T[],
    idKey: keyof T,
    valueKey: keyof T,
    setValue: UseFormSetValue<any>,
    selfDestruct: () => void,
    inputFieldName: string,
}) => {

    const [filteredOptions, setFilteredOptions] = useState(options);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm !== '') {
            const fuse = new Fuse(options, {
                keys: [valueKey as string],
                threshold: 0.3,  // Lower values mean more exact matches
            });

            const result = fuse.search(searchTerm);
            const newFilteredOptions = result.map(r => r.item).slice(0,10);
            setFilteredOptions(newFilteredOptions);
        } else {
            setFilteredOptions(options);
        }
    }, [searchTerm, options, valueKey]);



    // Handle option selection from modal
    const handleOptionClick = (id: any) => {
        const idFiltered = Number(id) || 0;
        setValue(inputFieldName, idFiltered);
        selfDestruct();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h1 className='title-1-dark text-center mb-2'>Buscador de Maestros</h1>
                        <input
                            type="text"
                            autoFocus
                            value={searchTerm}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                            placeholder="Filtrar Maestros Por Nombre"
                            className="w-full border border-gray-300 p-2 rounded mb-4"
                        />

                        <ul className="h-40 overflow-y-auto border rounded">
                            {filteredOptions.map(option => (
                                <li
                                    key={safeString(option[idKey])}
                                    onClick={() => handleOptionClick(option[idKey])}
                                    className="cursor-pointer p-2 transition-all ease-in-out duration-300 hover:bg-gray-200 divider-dark"
                                >
                                    {safeString(option[valueKey])}
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => selfDestruct()}
                        >
                            Close
                        </button>
                    </div>
                </div>

    );
};
