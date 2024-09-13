'use client'
import ListHeaders from "@/components/listHeaders";
import { CursoFacultadType } from "@/models/curso";
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { OpcionTerminalCursoType } from "@/models/opcionTerminalCurso";
import { ProgramaType } from "@/models/programa";
import WidthType from "@/models/width";
import { useEffect, useState } from "react";

const ListaCursosClient = ({
    className,
    catalogoCursosFacultades,
    catalogoNivelesCurriculares,
    catalogoProgramas,
    catalogoOpcionesTerminales,
    opcionesTerminales,
}: {
    className: string,
    catalogoCursosFacultades: CursoFacultadType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoProgramas: ProgramaType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    opcionesTerminales: OpcionTerminalCursoType[],
}) => {
    // Define column widths
    const widths: [WidthType, WidthType, WidthType, WidthType] = ['w-[40%]', 'w-[20%]', 'w-[20%]', 'w-[20%]'];

    // State for managing the current list of displayed courses and filters
    const [currentCursos, setCurrentCursos] = useState<CursoFacultadType[]>(catalogoCursosFacultades);
    const [opcionTerminalFilter, setOpcionTerminalFilter] = useState<OpcionTerminalType | null>(null);
    const [nivelFilter, setNivelFilter] = useState<NivelCurricularType | null>(null);
    const [programaFilter, setProgramaFilter] = useState<ProgramaType | null>(null);

    // useEffect to filter courses based on selected filters
    useEffect(() => {
        let filteredCursos = catalogoCursosFacultades;

        // Filter by selected Opcion Terminal
        if (opcionTerminalFilter) {
            filteredCursos = filteredCursos.filter(
                (curso) => curso.id_opcion_terminal === opcionTerminalFilter.id
            );
        }

        // Filter by selected Nivel Curricular
        if (nivelFilter) {
            filteredCursos = filteredCursos.filter(
                (curso) => curso.id_nivel_curricular === nivelFilter.id
            );
        }

        // Filter by selected Programa
        if (programaFilter) {
            filteredCursos = filteredCursos.filter(
                (curso) => curso.id_programa === programaFilter.id
            );
        }

        filteredCursos.sort((a, b) => a.id_nivel_curricular - b.id_nivel_curricular);

        setCurrentCursos(filteredCursos);
    }, [opcionTerminalFilter, nivelFilter, programaFilter, catalogoCursosFacultades]);

    // Handle click events for Opcion Terminal buttons
    const handleOpcionTerminalClick = (opcionTerminal: OpcionTerminalType | null) => {
        setOpcionTerminalFilter(opcionTerminal);
    };

    // Handle click events for Nivel Curricular buttons
    const handleNivelFilterClick = (nivel: NivelCurricularType | null) => {
        setNivelFilter(nivel);
    };

    // Handle click events for Programa buttons
    const handleProgramaFilterClick = (programa: ProgramaType | null) => {
        setProgramaFilter(programa);
    };

    return (
        <div>
            {/* Buttons for Opcion Terminal filter */}
            <div className='flex'>
                <button
                    onClick={() => handleOpcionTerminalClick(null)}
                    className={`p-2 m-2 border text-white rounded-xl ${
                        !opcionTerminalFilter ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                >
                    Todos
                </button>
                {catalogoOpcionesTerminales.map((ot) => (
                    <button
                        onClick={() => handleOpcionTerminalClick(ot)}
                        key={ot.id}
                        className={`p-2 m-2 border text-white rounded-xl ${
                            opcionTerminalFilter?.id === ot.id ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                    >
                        {ot.opcion_terminal}
                    </button>
                ))}
            </div>

            {/* Buttons for Nivel Curricular filter */}
            <div className='flex mt-4'>
                <button
                    onClick={() => handleNivelFilterClick(null)}
                    className={`p-2 m-2 border text-white rounded-xl ${
                        !nivelFilter ? 'bg-green-500 ' : 'bg-blue-500'
                    }`}
                >
                    Todos
                </button>
                {catalogoNivelesCurriculares.map((nivel) => (
                    <button
                        onClick={() => handleNivelFilterClick(nivel)}
                        key={nivel.id}
                        className={`p-2 m-2 border text-white rounded-xl ${
                            nivelFilter?.id === nivel.id ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                    >
                        {nivel.nivel_curricular}
                    </button>
                ))}
            </div>

            {/* Buttons for Programa filter */}
            <div className='flex mt-4'>
                <button
                    onClick={() => handleProgramaFilterClick(null)}
                    className={`p-2 m-2 border text-white rounded-xl ${
                        !programaFilter ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                >
                    Todos
                </button>
                {catalogoProgramas.map((programa) => (
                    <button
                        onClick={() => handleProgramaFilterClick(programa)}
                        key={programa.id}
                        className={`p-2 m-2 border text-white rounded-xl ${
                            programaFilter?.id === programa.id ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                    >
                        {programa.programa}
                    </button>
                ))}
            </div>

            {/* Display the list of filtered courses */}
            <ul className={`${className}`}>
                <ListHeaders
                    className=''
                    widthList={widths}
                    headersList={['Curso', 'Opcion Terminal', 'Programa', 'Nivel Curricular']}
                />
                {currentCursos.map((curso) => (
                    <li className='flex divider-dark p-2' key={curso.id}>
                        <span className={widths[0]}>{curso.nombre}</span>
                        <span className={widths[1]}>
                            {catalogoOpcionesTerminales.find((ot) => ot.id === curso.id_opcion_terminal)?.opcion_terminal}
                        </span>
                        <span className={widths[2]}>
                            {catalogoProgramas.find((p) => p.id === curso.id_programa)?.programa}
                        </span>
                        <span className={widths[3]}>
                            {catalogoNivelesCurriculares.find((nc) => nc.id === curso.id_nivel_curricular)?.nivel_curricular}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaCursosClient;
