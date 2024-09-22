'use client'
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { ParticipacionCursoType, ParticipacionesDocentesType } from "@/models/participacionCurso";
import { ProgramaType } from "@/models/programa";
import { RolType } from "@/models/rol";
import { useEffect, useState } from "react";

const FiltrosParticipantesCursos = ({
    className,
    setCurrentParticipantes,
    setCurrentParticipaciones,
    catalogoOpcionesTerminales,
    catalogoProgramas,
    catalogoNivelesCurriculares,
    catalogoRoles,
    participacionesCursos,
}:{
    className: string,
    setCurrentParticipantes: ( participantes: ParticipacionesDocentesType[] ) => void,
    setCurrentParticipaciones: ( participaciones: ParticipacionCursoType[] ) => void,
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoProgramas: ProgramaType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
    catalogoRoles: RolType[],
    participacionesCursos: ParticipacionCursoType[],
}) => {

    const [selectedOpcionesTerminales, setSelectedOpcionesTerminales] = useState<OpcionTerminalType[]>(catalogoOpcionesTerminales);
    const [selectedProgramas, setSelectedProgramas] = useState<ProgramaType[]>(catalogoProgramas);
    const [selectedNivelesCurriculares, setSelectedNivelesCurriculares] = useState<NivelCurricularType[]>(catalogoNivelesCurriculares);
    const [selectedRoles, setSelectedRoles] = useState<RolType[]>(catalogoRoles);



    const countByMaestro = (participacionesCursos: ParticipacionCursoType[]) => {
        // Create a map to store the maestro's participations per curso
        const participacionesMap = participacionesCursos.reduce((acc, { id_maestro, id_curso }) => {
            if (!acc.has(id_maestro)) {
                acc.set(id_maestro, new Map<number, number>());
            }
            const cursosMap = acc.get(id_maestro)!;
            cursosMap.set(id_curso, (cursosMap.get(id_curso) || 0) + 1);
            return acc;
        }, new Map<number, Map<number, number>>());

        // Convert the map into a list of objects with id_maestro and participaciones (count of cursos)
        const result: ParticipacionesDocentesType[] = Array.from(participacionesMap.entries()).map(([id_maestro, cursosMap]) => {
            return {
                id_maestro,
                participaciones: cursosMap.size, // Number of distinct cursos for this maestro
            };
        });

        return result.sort((a,b) => b.participaciones-a.participaciones);
    };

    useEffect(() => {
        const newParticipacionesCursos = participacionesCursos.filter((participacion) =>
            selectedOpcionesTerminales.some((opcion) => opcion.id === participacion.id_opcion_terminal) &&
            selectedProgramas.some((programa) => programa.id === participacion.id_programa) &&
            selectedNivelesCurriculares.some((nivel) => nivel.id === participacion.id_nivel_curricular) &&
            selectedRoles.some((rol) => rol.id === participacion.id_rol)
        );

        setCurrentParticipaciones(newParticipacionesCursos);

        const newParticipantes = countByMaestro(newParticipacionesCursos);
        setCurrentParticipantes(newParticipantes);
    },[participacionesCursos, selectedOpcionesTerminales, selectedProgramas, selectedNivelesCurriculares, selectedRoles, setCurrentParticipaciones, setCurrentParticipantes]);

    const toggleOpcionTerminalFilter = (idOpcionTerminal: number) => {
        if( selectedOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal) ){
            const newSelectedOpcionesTerminales = selectedOpcionesTerminales.filter((ot) => ot.id !== idOpcionTerminal);
            setSelectedOpcionesTerminales(newSelectedOpcionesTerminales);
        }else{
            const newSelectedOpcionTerminal = catalogoOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal);
            if( newSelectedOpcionTerminal ){
                setSelectedOpcionesTerminales([...selectedOpcionesTerminales, newSelectedOpcionTerminal]);
            }
        }
    };

    const toggleProgramaFilter = ( idPrograma: number ) => {
        if( selectedProgramas.find((p) => p.id === idPrograma) ){
            const newSelectedProgramas = selectedProgramas.filter((p) => p.id !== idPrograma );
            setSelectedProgramas( newSelectedProgramas );
        } else {
            const newSelectedPrograma = catalogoProgramas.find((p) => p.id === idPrograma);
            if ( newSelectedPrograma ) {
                setSelectedProgramas([...selectedProgramas, newSelectedPrograma]);
            }
        }
    };

    const toggleNivelCurricularFilter = (idNivelCurricular: number) => {
        if (selectedNivelesCurriculares.find((nc) => nc.id === idNivelCurricular)) {
            const newSelectedNivelesCurriculares = selectedNivelesCurriculares.filter((nc) => nc.id !== idNivelCurricular);
            setSelectedNivelesCurriculares(newSelectedNivelesCurriculares);
        } else {
            const newSelectedNivelCurricular = catalogoNivelesCurriculares.find((nc) => nc.id === idNivelCurricular);
            if (newSelectedNivelCurricular) {
                setSelectedNivelesCurriculares([...selectedNivelesCurriculares, newSelectedNivelCurricular]);
            }
        }
    };

    const toggleRolFilter = (idRol: number) => {
        if (selectedRoles.find((rol) => rol.id === idRol)) {
            const newSelectedRoles = selectedRoles.filter((rol) => rol.id !== idRol);
            setSelectedRoles(newSelectedRoles);
        } else {
            const newSelectedRol = catalogoRoles.find((rol) => rol.id === idRol);
            if (newSelectedRol) {
                setSelectedRoles([...selectedRoles, newSelectedRol]);
            }
        }
    };


    return (
        <div className={`${className}`}>
            {/* Opcion Terminal Filter */}
            <div>
            <button onClick={() => setSelectedOpcionesTerminales(catalogoOpcionesTerminales)} className='filter-button-todos'>
            Todos
        </button>
            {catalogoOpcionesTerminales.map((opcion) => (
                <button
                onClick={() => toggleOpcionTerminalFilter(opcion.id)}
                className={`${selectedOpcionesTerminales.find((ot) => ot.id === opcion.id) ? 'filter-button-on' : 'filter-button-off'}`}
                key={opcion.id}
                    >
                    {opcion.opcion_terminal}
                </button>
            ))}
            <button onClick={() => setSelectedOpcionesTerminales([])} className='filter-button-ninguno'>
            Ninguna
        </button>
            </div>

            {/* Programa Filter */}
            <div>
            <button onClick={() => setSelectedProgramas(catalogoProgramas)} className='filter-button-todos'>
            Todos
        </button>
            {catalogoProgramas.map((programa) => (
                <button
                onClick={() => toggleProgramaFilter(programa.id)}
                className={`${selectedProgramas.find((p) => p.id === programa.id) ? 'filter-button-on' : 'filter-button-off'}`}
                key={programa.id}
                    >
                    {programa.programa}
                </button>
            ))}
            <button onClick={() => setSelectedProgramas([])} className='filter-button-ninguno'>
            Ninguno
        </button>
            </div>

            {/* Nivel Curricular Filter */}
            <div>
            <button onClick={() => setSelectedNivelesCurriculares(catalogoNivelesCurriculares)} className='filter-button-todos'>
            Todos
        </button>
            {catalogoNivelesCurriculares.map((nivel) => (
                <button
                onClick={() => toggleNivelCurricularFilter(nivel.id)}
                className={`${selectedNivelesCurriculares.find((nc) => nc.id === nivel.id) ? 'filter-button-on' : 'filter-button-off'}`}
                key={nivel.id}
                    >
                    {nivel.nivel_curricular}
                </button>
            ))}
            <button onClick={() => setSelectedNivelesCurriculares([])} className='filter-button-ninguno'>
            Ninguno
        </button>
            </div>

            {/* Rol Filter */}
            <div>
            <button onClick={() => setSelectedRoles(catalogoRoles)} className='filter-button-todos'>
            Todos
        </button>
            {catalogoRoles.map((rol) => (
                <button
                onClick={() => toggleRolFilter(rol.id)}
                className={`${selectedRoles.find((r) => r.id === rol.id) ? 'filter-button-on' : 'filter-button-off'}`}
                key={rol.id}
                    >
                    {rol.rol}
                </button>
            ))}
            <button onClick={() => setSelectedRoles([])} className='filter-button-ninguno'>
            Ninguno
        </button>
            </div>
            </div>
    );

};
export default FiltrosParticipantesCursos;
