import { cookies } from 'next/headers';

import { getCursosMini, GetCursosMiniType } from '@utils/cursos/getCursosMini';
import WidthType from '@/models/width';
import ListHeaders from '@/components/listHeaders';
import { notFound } from 'next/navigation';
import Curso from './curso';
import { RolType } from '@/models/rol';

const Cursos = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    const response: GetCursosMiniType = await getCursosMini(token);

    const catalogoRoles: RolType[] = [
        {id:1, rol:'Titular'},
        {id:2, rol:'Docente'},
        {id:3, rol:'Admin'},
        {id:4, rol:'Colaborador'},
    ];
    if(!response.success){
        return notFound();
    }

    const widths: [WidthType, WidthType, WidthType, WidthType] = ['w-[10%]', 'w-[50%]', 'w-[20%]','w-[20%]'];
 

    return (
        <section>
            <h1 className='title-1-dark mb-4'>Mis Cursos</h1>
            <ul>
                <ListHeaders
                    className=''
                    headersList={['Clave', 'Nombre del Curso', 'Rol', 'Acciones']}
                    widthList={widths}
                />
                {response.cursos_mini.map((curso) => (
                    <li key={curso.id}>
                        <Curso
                            className='divider-dark p-1'
                            curso={curso}
                            widthList={widths}
                            catalogoRoles={catalogoRoles}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Cursos;
