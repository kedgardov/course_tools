'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const catalogoEjemplos = [
    { id: 1, label: 'Azul' },
    { id: 2, label: 'Rojo' },
    { id: 3, label: 'Blanco' },
    { id: 4, label: 'Gris' },
    { id: 5, label: 'Negro' },
    { id: 6, label: 'Morado' },
    { id: 7, label: 'Amarillo' },
    { id: 8, label: 'Verde' },
    { id: 9, label: 'Cyan' },
    { id: 10, label: 'Magenta' },
    { id: 11, label: 'Rosa' },
    { id: 12, label: 'Turquesa' },
    { id: 13, label: 'Lila' },
];

const Test = () => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(catalogoEjemplos);
    const [searchTerm, setSearchTerm] = useState('');

    // Watch the selected value
    const selectedValue = watch('myInput');

    // Filter logic with a limit of top 10 results
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = catalogoEjemplos
            .filter(option => option.label.toLowerCase().includes(value))
            .slice(0, 10); // Limit to top 10 results
        setFilteredOptions(filtered);
    };

    // Handle value selection from modal
    const handleOptionClick = (id: number) => {
        setValue('myInput', id); // Set the ID as the value
        setIsModalOpen(false); // Close the modal
    };

    // Open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Submit handler
    const onSubmit = (data: any) => {
        console.log('Selected:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select {...register('myInput')}>
                    {catalogoEjemplos.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Filter Button */}
                <button type="button" onClick={openModal}>
                    Filter
                </button>
            </div>

            {/* Submit button */}
            <button type="submit">Submit</button>

            {/* Modal for fuzzy search */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                        />

                        <ul>
                            {filteredOptions.map(option => (
                                <li
                                    key={option.id}
                                    onClick={() => handleOptionClick(option.id)}
                                    style={{ cursor: 'pointer', margin: '5px 0' }}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>

                        <button type="button" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Optional styling for modal */}
            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 300px;
                    text-align: center;
                }
            `}</style>
        </form>
    );
};

export default Test;
