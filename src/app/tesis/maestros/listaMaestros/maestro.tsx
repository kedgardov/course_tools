'use client'

import { MaestroPronacesType } from '@/models/maestro';
import { useState, useEffect } from 'react';

const Filtros = ({
    maestrosPronaces,
    calculateTotal,
    setCurrentMaestros,
}:{
    maestrosPronaces: MaestroPronacesType[],
    calculateTotal: (maestro: MaestroPronacesType) => number,
    setCurrentMaestros: ( maestros: MaestroPronacesType[] ) => void,
}) => {

    const pronaceButtons = [
        { key: 'count_pronace_1', label: 'Agentes Tóxicos y Procesos Contaminantes' },
        { key: 'count_pronace_2', label: 'Agua' },
        { key: 'count_pronace_3', label: 'Cultura' },
        { key: 'count_pronace_4', label: 'Educación' },
        { key: 'count_pronace_5', label: 'Energía y Cambio Climático' },
        { key: 'count_pronace_6', label: 'Salud' },
        { key: 'count_pronace_7', label: 'Seguridad Humana' },
        { key: 'count_pronace_8', label: 'Sistemas Socio-Ecológicos' },
        { key: 'count_pronace_9', label: 'Soberanía Alimentaria' },
        { key: 'count_pronace_10', label: 'Vivienda' },
        { key: 'count_pronace_11', label: 'Otro' },
        { key: 'count_pronace_12', label: 'Economía' },
        { key: 'count_pronace_13', label: 'Materiales' },
    ];

    const [selectedPronaces, setSelectedPronaces] = useState<Record<string, boolean>>({
        count_pronace_1: true,
        count_pronace_2: true,
        count_pronace_3: true,
        count_pronace_4: true,
        count_pronace_5: true,
        count_pronace_6: true,
        count_pronace_7: true,
        count_pronace_8: true,
        count_pronace_9: true,
        count_pronace_10: true,
        count_pronace_11: true,
        count_pronace_12: true,
        count_pronace_13: true,
    });

    useEffect(() => {
        const sortedAndFilteredMaestros = [...maestrosPronaces]
            .filter(maestro => calculateTotal(maestro) > 0)
            .sort((a, b) => calculateTotal(b) - calculateTotal(a));

        setCurrentMaestros(sortedAndFilteredMaestros);
    }, [selectedPronaces, maestrosPronaces, calculateTotal, setCurrentMaestros]);


    const togglePronace = (key: string) => {
        setSelectedPronaces(prev => ({
            ...prev,
            [key]: !prev[key],  // Toggle the selected state
        }));
    };

      // Set all pronaces to true
    const selectAllPronaces = () => {
        const allTrue = Object.fromEntries(Object.keys(selectedPronaces).map(key => [key, true]));
        setSelectedPronaces(allTrue);
    };

    // Set all pronaces to false
    const clearAllPronaces = () => {
        const allFalse = Object.fromEntries(Object.keys(selectedPronaces).map(key => [key, false]));
        setSelectedPronaces(allFalse);
    };

    return (
        <div className="mb-4">
            <button
                className="mx-1 my-2 px-2 py-1 bg-green-500 text-white"
                onClick={selectAllPronaces}
            >
                Todos
            </button>
            <button
                className="mx-1 my-2 px-2 py-1 bg-red-500 text-white"
                onClick={clearAllPronaces}
            >
                Limpiar
            </button>
            {pronaceButtons.map((button) => (
                <button
                key={button.key}
                className={`mx-2 my-2 px-2 py-1 ${selectedPronaces[button.key] ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => togglePronace(button.key)}
                    >
                    {button.label}
                </button>
            ))}
        </div>

    );
};
export default Filtros;
