'use client'
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { OpcionTerminalCursoType } from "@/models/opcionTerminalCurso";
import { ProgramaType } from "@/models/programa";
import { useEffect, useState } from "react";

const FiltrosCursos = ({
    className,
    catalogoNivelesCurriculares,
    catalogoProgramas,
    catalogoOpcionesTerminales,
    setCurrentOpcionesTerminales,
    opcionesTerminales,
}:{
    className: string,
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoProgramas: ProgramaType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    setCurrentOpcionesTerminales: ( newOpcionesTerminales: OpcionTerminalCursoType[] ) => void,
    opcionesTerminales: OpcionTerminalCursoType[],
}) => {

    const [selectedOpcionesTerminales, setSelectedOpcionesTerminales] = useState<OpcionTerminalType[]>(catalogoOpcionesTerminales);
    const [selectedProgramas, setSelectedProgramas] = useState<ProgramaType[]>(catalogoProgramas);
    const [selectedNivelesCurriculares, setSelectedNivelesCurriculares] = useState<NivelCurricularType[]>(catalogoNivelesCurriculares);

    useEffect(()=>{
        const newOpcionesTerminales = opcionesTerminales.filter((opcion) =>
            selectedOpcionesTerminales.some((ot) => ot.id === opcion.id_opcion_terminal) &&
            selectedProgramas.some((p) => p.id === opcion.id_programa) &&
            selectedNivelesCurriculares.some((nc) => nc.id === opcion.id_nivel_curricular)
        );
        setCurrentOpcionesTerminales(newOpcionesTerminales);
    },[selectedNivelesCurriculares, selectedOpcionesTerminales, selectedProgramas, opcionesTerminales, setCurrentOpcionesTerminales]);

    const toggleOpcionesTerminalesFilter = (idOpcionTerminal: number) => {
        if( selectedOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal) ){
            const newSelectedOpcionesTerminales = selectedOpcionesTerminales.filter((ot) => ot.id !== idOpcionTerminal);
            setSelectedOpcionesTerminales(newSelectedOpcionesTerminales);
        } else{
            const newOpcionTerminal = catalogoOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal);
            if(newOpcionTerminal){
                setSelectedOpcionesTerminales([...selectedOpcionesTerminales, newOpcionTerminal]);
            }
        }
    };

    const toggleProgramaFilter = (idPrograma: number) => {
        if( selectedProgramas.find((p) => p.id === idPrograma) ){
            const newSelectedProgramas = selectedProgramas.filter((p) => p.id !== idPrograma);
            setSelectedProgramas(newSelectedProgramas);
        } else{
            const newPrograma = catalogoProgramas.find((p) => p.id === idPrograma);
            if(newPrograma){
                setSelectedProgramas([...selectedProgramas, newPrograma]);
            }
        }
    };

    const toggleNivelesCurricularesFilter = (idNivelCurricular: number) => {
        if( selectedNivelesCurriculares.find((nc) => nc.id === idNivelCurricular) ){
            const newSelectedNivelesCurriculares = selectedNivelesCurriculares.filter((nc) => nc.id !== idNivelCurricular);
            setSelectedNivelesCurriculares(newSelectedNivelesCurriculares);
        } else{
            const newNivelCurricular = catalogoNivelesCurriculares.find((nc) => nc.id === idNivelCurricular);
            if(newNivelCurricular){
                setSelectedNivelesCurriculares([...selectedNivelesCurriculares, newNivelCurricular]);
            }
        }
    };

    return (
    <section className={`${className}`}>
        {/* Opcion Terminal Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Opción Terminal</h2>
        <div className='divider-dark mb-2'>
            <button
                onClick={() => setSelectedOpcionesTerminales(catalogoOpcionesTerminales)}
                className='filter-button-todos'
            >
                Todas
            </button>
            {catalogoOpcionesTerminales.map((opcion) => (
                <button
                    onClick={() => toggleOpcionesTerminalesFilter(opcion.id)}
                    key={opcion.id}
                    className={`${selectedOpcionesTerminales.find((ot) => ot.id === opcion.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {opcion.opcion_terminal}
                </button>
            ))}
            <button
                className='filter-button-ninguno'
                onClick={() => setSelectedOpcionesTerminales([])}
            >
                Ninguna
            </button>
        </div>

        {/* Programa Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Programa</h2>
        <div className='divider-dark mb-2'>
            <button
                onClick={() => setSelectedProgramas(catalogoProgramas)}
                className='filter-button-todos'
            >
                Todos
            </button>
            {catalogoProgramas.map((programa) => (
                <button
                    onClick={() => toggleProgramaFilter(programa.id)}
                    key={programa.id}
                    className={`${selectedProgramas.find((p) => p.id === programa.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {programa.programa}
                </button>
            ))}
            <button
                className='filter-button-ninguno'
                onClick={() => setSelectedProgramas([])}
            >
                Ninguno
            </button>
        </div>

        {/* Nivel Curricular Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Nivel Curricular</h2>
        <div className='divider-dark mb-2'>
            <button
                onClick={() => setSelectedNivelesCurriculares(catalogoNivelesCurriculares)}
                className='filter-button-todos'
            >
                Todos
            </button>
            {catalogoNivelesCurriculares.map((nivelCurricular) => (
                <button
                    onClick={() => toggleNivelesCurricularesFilter(nivelCurricular.id)}
                    key={nivelCurricular.id}
                    className={`${selectedNivelesCurriculares.find((nc) => nc.id === nivelCurricular.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {nivelCurricular.nivel_curricular}
                </button>
            ))}
            <button
                className='filter-button-ninguno'
                onClick={() => setSelectedNivelesCurriculares([])}
            >
                Ninguno
            </button>
        </div>
    </section>
);


};
export default FiltrosCursos;
