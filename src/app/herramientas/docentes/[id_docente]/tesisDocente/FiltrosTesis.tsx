'use client'

import { GradoType } from "@/models/grado";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { PronaceType } from "@/models/pronace";
import { RolTesisType } from "@/models/rolTesis";
import { TesisMiniMaestroType } from "@/models/tesis";
import { useEffect, useState } from "react";

const FiltrosTesis = ({
    className,
    catalogoTesis,
    setCurrentTesis,
    catalogoPronaces,
    catalogoRolesTesis,
    catalogoGrados,
    catalogoAnos,
    catalogoOpcionesTerminales,
}:{
    className: string,
    catalogoTesis: TesisMiniMaestroType[]
    setCurrentTesis: (newTesis: TesisMiniMaestroType[]) => void,
    catalogoPronaces: PronaceType[],
    catalogoRolesTesis: RolTesisType[],
    catalogoGrados: GradoType[],
    catalogoAnos: string[],
    catalogoOpcionesTerminales: OpcionTerminalType[]
}) => {

    const [selectedPronaces, setSelectedPronaces] = useState<PronaceType[]>(catalogoPronaces);
    const [selectedRolesTesis, setSelectedRolesTesis] = useState<RolTesisType[]>(catalogoRolesTesis);
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

    const toggleRolTesisFilter = (idRolTesis: number) => {
        if( selectedRolesTesis.find((r) => r.id === idRolTesis) ){
            const newSelectedRolesTesis = selectedRolesTesis.filter((r) => r.id !== idRolTesis);
            setSelectedRolesTesis(newSelectedRolesTesis);
        }else{
            const newSelectedRolTesis = catalogoRolesTesis.find((c) => c.id === idRolTesis);
            if( newSelectedRolTesis ){
                setSelectedRolesTesis([...selectedRolesTesis, newSelectedRolTesis]);
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
        console.time('FilterTimer');
        const newTesis = catalogoTesis.filter((tesis) =>
            selectedPronaces.some((pronace) => pronace.id === tesis.id_pronace) &&
            selectedRolesTesis.some((rolTesis) => rolTesis.id === tesis.id_rol_tesis) &&
            selectedGrados.some((grado) => grado.id === tesis.id_grado ) &&
            selectedOpcionesTerminales.some((opcion) => opcion.id === tesis.id_opcion_terminal) &&
            selectedAnos.some((ano) => tesis.fecha.includes(ano))
        );
        setCurrentTesis(newTesis);
        console.timeEnd('FilterTimer');
    },[catalogoTesis, setCurrentTesis, selectedPronaces, catalogoOpcionesTerminales, selectedGrados, selectedAnos, selectedOpcionesTerminales, selectedRolesTesis]);


return (
    <div className={`${className}`}>
        <div>
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

        <div>
            <button onClick={() => setSelectedRolesTesis(catalogoRolesTesis)} className='filter-button-todos'>
                Todas
            </button>
            {catalogoRolesTesis.map((rolTesis) => (
                <button
                    onClick={() => toggleRolTesisFilter(rolTesis.id)}
                    key={`rol-tesis-filter-${rolTesis.id}`}
                    className={`${selectedRolesTesis.find((r) => r.id === rolTesis.id) ? 'filter-button-on' : 'filter-button-off'}`}
                >
                    {rolTesis.rol_tesis}
                </button>
            ))}
            <button onClick={() => setSelectedRolesTesis([])} className='filter-button-ninguno'>
                Ninguna
            </button>
        </div>

        <div>
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

        <div>
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

        <div>
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
