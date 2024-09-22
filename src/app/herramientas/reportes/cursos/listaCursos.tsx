import ListHeaders from "@/components/listHeaders";
import { CursoNombreType } from "@/models/curso";
import { NivelCurricularType } from "@/models/nivelCurricular";
import { OpcionTerminalType } from "@/models/opcionTerminal";
import { OpcionTerminalCursoType } from "@/models/opcionTerminalCurso";
import { ProgramaType } from "@/models/programa";
import WidthType from "@/models/width";

const ListaCursos = ({
    className,
    currentOpcionesTerminales,
    catalogoCursos,
    catalogoProgramas,
    catalogoOpcionesTerminales,
    catalogoNivelesCurriculares,
}:{
    className: string,
    currentOpcionesTerminales: OpcionTerminalCursoType[],
    catalogoCursos: CursoNombreType[],
    catalogoProgramas: ProgramaType[],
    catalogoOpcionesTerminales: OpcionTerminalType[],
    catalogoNivelesCurriculares: NivelCurricularType[],
}) => {
    const widths: [WidthType, WidthType, WidthType, WidthType] = [
                    'w-[40%]','w-[20%]','w-[20%]','w-[20%]'
    ];

    return (
        <section className={`${className}`}>
            <ul>
                <ListHeaders
                    className=''
                    widthList={widths}
                    headersList={['Nombre del Curso','Opcion Terminal','Programa','Nivel Curricular']}
                />
                {currentOpcionesTerminales.map((opcionTerminal) => (
                    <li key={opcionTerminal.id} className='divider-dark p-2 flex'>
                        <span className={widths[0]}>{catalogoCursos.find((c) => c.id === opcionTerminal.id_curso)?.nombre || ''}</span>
                        <span className={widths[1]}>{catalogoOpcionesTerminales.find((ot) => ot.id === opcionTerminal.id_opcion_terminal)?.opcion_terminal || ''}</span>
                        <span className={widths[2]}>{catalogoProgramas.find((p) => p.id === opcionTerminal.id_programa)?.programa || ''}</span>
                        <span className={widths[3]}>{catalogoNivelesCurriculares.find((nc) => nc.id === opcionTerminal.id_nivel_curricular)?.nivel_curricular ||''}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
export default ListaCursos;
