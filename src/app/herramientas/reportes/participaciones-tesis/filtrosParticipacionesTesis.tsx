'use client'
import { GradoType } from "@/models/grado";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { ParticipacionesDocentesType, ParticipacionTesisType } from "@/models/participacionTesis";
import { PronaceType } from "@/models/pronace";
import { RolTesisType } from "@/models/rolTesis";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { useState, useEffect } from "react";

const FiltrosParticipacionesTesis = ({
    className,
    setCurrentParticipantes,
    setCurrentParticipaciones,
    catalogoRolesTesis,
    catalogoCoordinaciones,
    catalogoPronaces,
    catalogoGrados,
    catalogoAnos,
    catalogoOpcionesTerminales,
    participacionesTesis,
}:{
    className: string,
    setCurrentParticipantes: ( participantes: ParticipacionesDocentesType[] ) => void,
    setCurrentParticipaciones: ( participaciones: ParticipacionTesisType[] ) => void,
    catalogoRolesTesis: RolTesisType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoPronaces: PronaceType[],
    catalogoGrados: GradoType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    participacionesTesis: ParticipacionTesisType[],
}) => {

    const [selectedPronaces, setSelectedPronaces] = useState<PronaceType[]>(catalogoPronaces);
    const [selectedCoordinaciones, setSelectedCoordinaciones] = useState<CoordinacionType[]>(catalogoCoordinaciones);
    const [selectedGrados, setSelectedGrados] = useState<GradoType[]>(catalogoGrados);
    const [selectedAnos, setSelectedAnos] = useState<string[]>(catalogoAnos);
    const [selectedRolesTesis, setSelectedRolesTesis] = useState<RolTesisType[]>(catalogoRolesTesis);
    const [selectedOpcionesTerminales, setSelectedOpcionesTerminales] = useState<OpcionTerminalType[]>(catalogoOpcionesTerminales);

    const countByMaestro = (participacionesTesis: ParticipacionTesisType[]) => {
        return participacionesTesis.reduce((acc, { id_maestro }) => {
            acc[id_maestro] = ( acc[id_maestro] || 0 ) + 1;
            return acc;
        },{} as {[key:number]: number});
    };

    useEffect(()=>{
        const newParticipacionesTesis = participacionesTesis.filter((participacion) =>
            selectedPronaces.some((pronace) => pronace.id === participacion.id_pronace) &&
            selectedCoordinaciones.some((coordinacion) => coordinacion.id === participacion.id_coordinacion) &&
            selectedGrados.some((grado) => grado.id === participacion.id_grado ) &&
            selectedAnos.some((ano) => participacion.fecha.includes(ano)) &&
            selectedRolesTesis.some((rolTesis) => rolTesis.id === participacion.id_rol_tesis) &&
            selectedOpcionesTerminales.some((opcion) => opcion.id === participacion.id_opcion_terminal)
        );


        setCurrentParticipaciones(newParticipacionesTesis);
        const newParticipacipantes = countByMaestro(newParticipacionesTesis);
        const participantesList = Object.entries(newParticipacipantes).map(([id_maestro, participaciones]) => ({
            id_maestro: Number(id_maestro),
            participaciones,
        }));
        setCurrentParticipantes(participantesList.sort((a,b) => b.participaciones - a.participaciones));
    },[participacionesTesis, setCurrentParticipantes,setCurrentParticipaciones, selectedOpcionesTerminales, selectedPronaces, selectedCoordinaciones, selectedGrados, selectedAnos, selectedRolesTesis, catalogoOpcionesTerminales]);


    const togglePronaceFilter = (idPronace: number) => {
        if( selectedPronaces.find((p) => p.id === idPronace)){
            const newSelectedPronaces = selectedPronaces.filter((p) => p.id !== idPronace);
            setSelectedPronaces(newSelectedPronaces);
        } else {
            const newSelectedPronace = catalogoPronaces.find((p) => p.id === idPronace);
            if( newSelectedPronace ){
                setSelectedPronaces([...selectedPronaces, newSelectedPronace]);
            }
        }
    };

    const toggleCoordinacionFilter = (idCoordinacion: number) => {
        if( selectedCoordinaciones.find((c) => c.id === idCoordinacion) ){
            const newSelectedCoordinaciones = selectedCoordinaciones.filter((c) => c.id !== idCoordinacion);
            setSelectedCoordinaciones(newSelectedCoordinaciones);
        }else{
            const newSelectedCoordinacion = catalogoCoordinaciones.find((c) => c.id === idCoordinacion);
            if( newSelectedCoordinacion ){
                setSelectedCoordinaciones([...selectedCoordinaciones, newSelectedCoordinacion]);
            }
        }
    }

    const toggleGradoFilter = ( idGrado: number ) => {
        if( selectedGrados.find((g) => g.id === idGrado) ){
            const newSelectedGrados = selectedGrados.filter((g) => g.id !== idGrado);
            setSelectedGrados(newSelectedGrados);
        }else{
            const newSelectedGrado = catalogoGrados.find((g) => g.id === idGrado);
            if( newSelectedGrado ){
                setSelectedGrados([...selectedGrados, newSelectedGrado]);
            }
        }
    }

    const toggleAnoFilter = ( ano: string ) => {
        if( selectedAnos.find((a) => a === ano) ){
            const newSelectedAnos = selectedAnos.filter((a) => a !== ano);
            setSelectedAnos(newSelectedAnos);
        }else{
            setSelectedAnos([...selectedAnos, ano]);
        }
    }

    const toggleRolTesisFilter = ( idRolTesis: number ) => {
        if( selectedRolesTesis.find((r) => r.id === idRolTesis) ){
            const newSelectedRolesTesis = selectedRolesTesis.filter((r) => r.id !== idRolTesis);
            setSelectedRolesTesis(newSelectedRolesTesis);
        }else{
            const newSelectedRolTesis = catalogoRolesTesis.find((r) => r.id === idRolTesis);
            if( newSelectedRolTesis ){
                setSelectedRolesTesis([...selectedRolesTesis, newSelectedRolTesis]);
            }
        }
    }

    const toggleOpcionTerminalFilter = ( idOpcionTerminal: number ) => {
        if( selectedOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal) ){
            const newSelectedOpcionesTerminales = selectedOpcionesTerminales.filter((ot) => ot.id !== idOpcionTerminal);
            setSelectedOpcionesTerminales(newSelectedOpcionesTerminales);
        }else{
            const newSelectedOpcionTerminal = catalogoOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal);
            if( newSelectedOpcionTerminal ){
                setSelectedOpcionesTerminales([...selectedOpcionesTerminales, newSelectedOpcionTerminal]);
            }
        }
    }

return (
    <div className={`${className}`}>
        {/* Pronace Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Pronace</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedPronaces(catalogoPronaces)} className='filter-button-todos'>
                Todos
            </button>
            {catalogoPronaces.map((pronace) => (
                <button
                    onClick={() => togglePronaceFilter(pronace.id)}
                    className={`${selectedPronaces.find((p) => p.id === pronace.id) ? 'filter-button-on' : 'filter-button-off'}`}
                    key={pronace.id}
                >
                    {pronace.pronace}
                </button>
            ))}
            <button onClick={() => setSelectedPronaces([])} className='filter-button-ninguno'>
                Ninguno
            </button>
        </div>

        {/* Coordinacion Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Coordinación</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedCoordinaciones(catalogoCoordinaciones)} className='filter-button-todos'>
                Todas
            </button>
            {catalogoCoordinaciones.map((coordinacion) => (
                <button
                    onClick={() => toggleCoordinacionFilter(coordinacion.id)}
                    className={`${selectedCoordinaciones.find((c) => c.id === coordinacion.id) ? 'filter-button-on' : 'filter-button-off'}`}
                    key={coordinacion.id}
                >
                    {coordinacion.coordinacion}
                </button>
            ))}
            <button onClick={() => setSelectedCoordinaciones([])} className='filter-button-ninguno'>
                Ninguna
            </button>
        </div>

        {/* Grado Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Grado</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedGrados(catalogoGrados)} className='filter-button-todos'>
                Todos
            </button>
            {catalogoGrados.map((grado) => (
                <button
                    onClick={() => toggleGradoFilter(grado.id)}
                    className={`${selectedGrados.find((g) => g.id === grado.id) ? 'filter-button-on' : 'filter-button-off'}`}
                    key={grado.id}
                >
                    {grado.grado}
                </button>
            ))}
            <button onClick={() => setSelectedGrados([])} className='filter-button-ninguno'>
                Ninguno
            </button>
        </div>

        {/* Año Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Año</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedAnos(catalogoAnos)} className='filter-button-todos'>
                Todos
            </button>
            {catalogoAnos.map((ano) => (
                <button
                    onClick={() => toggleAnoFilter(ano)}
                    className={`${selectedAnos.find((a) => a === ano) ? 'filter-button-on' : 'filter-button-off'}`}
                    key={ano}
                >
                    {ano}
                </button>
            ))}
            <button onClick={() => setSelectedAnos([])} className='filter-button-ninguno'>
                Ninguno
            </button>
        </div>

        {/* Rol Tesis Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Rol de Tesis</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedRolesTesis(catalogoRolesTesis)} className='filter-button-todos'>
                Todos
            </button>
            {catalogoRolesTesis.map((rolTesis) => (
                <button
                    onClick={() => toggleRolTesisFilter(rolTesis.id)}
                    className={`${selectedRolesTesis.find((r) => r.id === rolTesis.id) ? 'filter-button-on' : 'filter-button-off'}`}
                    key={rolTesis.id}
                >
                    {rolTesis.rol_tesis}
                </button>
            ))}
            <button onClick={() => setSelectedRolesTesis([])} className='filter-button-ninguno'>
                Ninguno
            </button>
        </div>

        {/* Opcion Terminal Filter */}
        <h2 className='title-2 mx-2'>Filtrar por Opción Terminal</h2>
        <div className='divider-dark mb-2'>
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
                Ninguno
            </button>
        </div>
    </div>
);

};
export default FiltrosParticipacionesTesis;
