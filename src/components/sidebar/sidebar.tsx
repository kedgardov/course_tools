import MisCursos from './misCursos';
import PanelAdmin from './panelAdmin';
import RepositoriosTesis from './repositoriosTesis';
import Facultades from './facultades';
import { Curso } from '../../models/curso';

const Sidebar = async ( { className }:{ className: string } ) => {

    const getCursos = async(): Promise<Curso[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                 const dummyCursos: Curso[] = [
        {
          id_curso: 1,
          clave: 'CS101',
          nombre: 'Computer Science',
          nombre_ingles: 'Computer Science',
          horas_teoricas: 3,
          horas_practicas: 2,
          horas_independientes: 1,
          horas_semana: 6,
          horas_semestre: 90,
        },
        {
          id_curso: 2,
          clave: 'MATH101',
          nombre: 'Mathematics',
          nombre_ingles: 'Mathematics',
          horas_teoricas: 3,
          horas_practicas: 2,
          horas_independientes: 1,
          horas_semana: 6,
          horas_semestre: 90,
        },
        {
          id_curso: 3,
          clave: 'PHY101',
          nombre: 'Physics',
          nombre_ingles: 'Physics',
          horas_teoricas: 3,
          horas_practicas: 2,
          horas_independientes: 1,
          horas_semana: 6,
          horas_semestre: 90,
        },
      ];
                //const dummyCursos = [
                    // new Curso(1, 'CS101', 'Computer Science', 'Computer Science', 3, 2, 1, 6, 90),
                    // new Curso(2, 'MATH101', 'Mathematics', 'Mathematics', 3, 2, 1, 6, 90),
                    // new Curso(3, 'PHY101', 'Physics', 'Physics', 3, 2, 1, 6, 90),
                //];
                resolve(dummyCursos);
            }, 3000);
        });
    }

    const cursos: Curso[] = await getCursos();

    return (
        <aside className={`${className} bg-primary divide-y`}>
            <header className='p-2 m-2 text-light flex justify-center text-4xl font-bold'>Course Tools</header>
            <MisCursos
                title='Mis Cursos'
                id='mis-cursos'
                name='mis-cursos'
                cursos={cursos}
            />
            <PanelAdmin
                title='Panel Admin'
                id='panel-administrador'
                name='panel-administrador'
            />
            <RepositoriosTesis
                title='Repositorios de Tesis'
                id='repositorios-tesis'
                name='repositorios-tesis'
            />
            <Facultades
                title='Facultades'
                id='facultades'
                name='facultades'
            />
        </aside>
    );
};

export default Sidebar;
