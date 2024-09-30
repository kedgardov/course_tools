'use client'

import { GradoType } from "@/models/grado";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { PronaceType } from "@/models/pronace";
import { TesisMiniType } from "@/models/tesis";
import { CoordinacionType } from "@/utils/repo_tesis/coordinaciones/getCatalogoCoordinaciones";
import { useEffect, useState } from "react";

const FiltrosTesis = ({
    catalogoTesis,
    setCurrentTesis,
    catalogoPronaces,
    catalogoCoordinaciones,
    catalogoGrados,
    catalogoAnos,
    catalogoOpcionesTerminales,
}:{
    catalogoTesis: TesisMiniType[]
    setCurrentTesis: (newTesis: TesisMiniType[]) => void,
    catalogoPronaces: PronaceType[],
    catalogoCoordinaciones: CoordinacionType[],
    catalogoGrados: GradoType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[]
}) => {

    const [selectedPronaces, setSelectedPronaces] = useState<PronaceType[]>(catalogoPronaces);
    const [selectedCoordinaciones, setSelectedCoordinaciones] = useState<CoordinacionType[]>(catalogoCoordinaciones);
    const [selectedGrados, setSelectedGrados] = useState<GradoType[]>(catalogoGrados);
    const [selectedOpcionesTerminales, setSelectedOpcionesTerminales] = useState<OpcionTerminalType[]>(catalogoOpcionesTerminales);
    const [selectedAnos, setSelectedAnos] = useState<string[]>(catalogoAnos);

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

    const toggleOpcionTerminalFilter = (idOpcionTerminal: number) => {
        if( selectedOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal)){
            const newSelectedOpcionesTerminales = selectedOpcionesTerminales.filter((ot) => ot.id !== idOpcionTerminal);
            setSelectedOpcionesTerminales(newSelectedOpcionesTerminales);
        } else {
            const newSelectedOpcionTerminal = catalogoOpcionesTerminales.find((ot) => ot.id === idOpcionTerminal);
            if( newSelectedOpcionTerminal ){
                 setSelectedOpcionesTerminales([...selectedOpcionesTerminales, newSelectedOpcionTerminal]);
            }
        }
    };

    useEffect(() => {

        const newTesis = catalogoTesis.filter((tesis) =>
            selectedPronaces.some((pronace) => pronace.id === tesis.id_pronace) &&
            selectedCoordinaciones.some((coordinacion) => coordinacion.id === tesis.id_coordinacion) &&
            selectedGrados.some((grado) => grado.id === tesis.id_grado ) &&
            selectedOpcionesTerminales.some((opcion) => opcion.id === tesis.id_opcion_terminal) &&
            selectedAnos.some((ano) => tesis.fecha.includes(ano))
        );
        setCurrentTesis(newTesis);

    },[catalogoTesis, setCurrentTesis, selectedPronaces, selectedCoordinaciones, catalogoOpcionesTerminales, selectedGrados, selectedAnos, selectedOpcionesTerminales]);


return (
    <div>
        <h2 className='title-2 mx-2'>Filtrar por Pronace</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedPronaces(catalogoPronaces)} className='filter-button-todos'>
                Todos
            </button>
            {catalogoPronaces.map((pronace) => (
                <button
                    onClick={() => togglePronaceFilter(pronace.id)}
                    key={`pronace-filter-${pronace.id}`}
                    className={`${selectedPronaces.find((p) => p.id === pronace.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {pronace.pronace}
                </button>
            ))}
            <button onClick={() => setSelectedPronaces([])} className='filter-button-ninguno'>
                Ninguno
            </button>
        </div>

        <h2 className='title-2 mx-2'>Filtrar por Coordinación</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedCoordinaciones(catalogoCoordinaciones)} className='filter-button-todos'>
                Todas
            </button>
            {catalogoCoordinaciones.map((coordinacion) => (
                <button
                    onClick={() => toggleCoordinacionFilter(coordinacion.id)}
                    key={`coordinaciones-filter-${coordinacion.id}`}
                    className={`${selectedCoordinaciones.find((c) => c.id === coordinacion.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {coordinacion.coordinacion}
                </button>
            ))}
            <button onClick={() => setSelectedCoordinaciones([])} className='filter-button-ninguno'>
                Ninguna
            </button>
        </div>

        <h2 className='title-2 mx-2'>Filtrar por Programa</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedGrados(catalogoGrados)} className='filter-button-todos'>
                Todas
            </button>
            {catalogoGrados.map((grado) => (
                <button
                    onClick={() => toggleGradoFilter(grado.id)}
                    key={`grado-filter-${grado.id}`}
                    className={`${selectedGrados.find((g) => g.id === grado.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {grado.grado}
                </button>
            ))}
            <button onClick={() => setSelectedGrados([])} className='filter-button-ninguno'>
                Ninguna
            </button>
        </div>

        <h2 className='title-2 mx-2'>Filtrar por Fecha</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedAnos(catalogoAnos)} className='filter-button-todos'>
                Todos
            </button>
            {catalogoAnos.map((ano) => (
                <button
                    onClick={() => toggleAnoFilter(ano)}
                    key={`anos-filter-${ano}`}
                    className={`${selectedAnos.find((a) => a === ano) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {ano}
                </button>
            ))}
            <button onClick={() => setSelectedAnos([])} className='filter-button-ninguno'>
                Ninguno
            </button>
        </div>

        <h2 className='title-2 mx-2'>Filtrar por Opción Terminal</h2>
        <div className='divider-dark mb-2'>
            <button onClick={() => setSelectedOpcionesTerminales(catalogoOpcionesTerminales)} className='filter-button-todos'>
                Todas
            </button>
            {catalogoOpcionesTerminales.map((opcion) => (
                <button
                    onClick={() => toggleOpcionTerminalFilter(opcion.id)}
                    key={`opciones-terminales-filter-${opcion.id}`}
                    className={`${selectedOpcionesTerminales.find((ot) => ot.id === opcion.id) ? 'filter-button-on' : 'filter-button-off'}`}
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
export default FiltrosTesis;
