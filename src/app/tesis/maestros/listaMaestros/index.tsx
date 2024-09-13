'use client'

import ListHeaders from "@/components/listHeaders";
import { MaestroPronacesType, MaestroType } from "@/models/maestro";
import WidthType from "@/models/width";
import Link from "next/link";
import { useState, useEffect } from "react";

const ListaMaestros = ({
    catalogoMaestros,
    maestrosPronaces,
}:{
    catalogoMaestros: MaestroType[],
    maestrosPronaces: MaestroPronacesType[],
}) => {
    const widths: [WidthType, WidthType, WidthType] = ['w-[40%]', 'w-[30%]','w-[30%]'];

    // State to keep track of sorted and filtered maestros
    const [currentMaestros, setCurrentMaestros] = useState<MaestroPronacesType[]>([]);

    // State to keep track of selected pronace buttons (active/inactive)
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

    // List of available pronace buttons with labels from catalogo_pronaces
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

    // Helper function to calculate total count based on active toggles
    const calculateTotal = (maestro: MaestroPronacesType) => {
        const activeKeys = Object.keys(selectedPronaces).filter(key => selectedPronaces[key]);
        // If no pronace is selected, return 0
        if (activeKeys.length === 0) {
            return 0;
        }
        // Sum counts for active pronace keys
        return activeKeys.reduce((total, key) => total + (maestro[key] || 0), 0);
    };

    // Effect to resort and filter currentMaestros whenever selectedPronaces changes
    useEffect(() => {
        const sortedAndFilteredMaestros = [...maestrosPronaces]
            .filter(maestro => calculateTotal(maestro) > 0)
            .sort((a, b) => calculateTotal(b) - calculateTotal(a));

        setCurrentMaestros(sortedAndFilteredMaestros);
    }, [selectedPronaces, maestrosPronaces]);

    // Toggle the selection of pronace filters
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
        <div>
            <Link className='p-2 m-1 border border-0 rounded bg-blue-400 text-white' href={`/tesis`}>Ver Por Tesis</Link>
            {/* Render buttons for each pronace */}
            <div className="my-4">
                <button
                    className="mx-1 my-2 px-2 py-1 bg-green-500 text-white border border-0 rounded"
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

            <h2>{`${currentMaestros.length} docentes participando`}</h2>
            <ul>
                <ListHeaders
                    className=''
                    widthList={widths}
                    headersList={['Docente','Total de Participaciones','Acciones']}
                />
                {currentMaestros.map((maestro) => (
                    <li key={maestro.id} className='flex p-2 divider-dark'>
                        <div className={widths[0]}>{catalogoMaestros.find((m) => m.id === maestro.id)?.label}</div>
                        <div className={widths[1]}>{calculateTotal(maestro)}</div>
                        <div className={`${widths[2]}`}><Link className='text-blue-400 transition ease-in-out duration-500 hover:text-blue-600' href={`/docentes/${maestro.id}`}> Ver Perfil </Link></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaMaestros;
