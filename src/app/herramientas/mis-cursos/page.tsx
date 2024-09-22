import { cookies } from 'next/headers';

import { getCursosMini, GetCursosMiniType } from '@utils/cursos/getCursosMini';
import WidthType from '@/models/width';
import ListHeaders from '@/components/listHeaders';
import { notFound } from 'next/navigation';
import Curso from './curso';
import { getCatalogoRoles, GetCatalogoRolesType } from '@/utils/cursos/getCatalogoRoles';


const MisCursos = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    const [
        responseGetCatalogoRoles,
        responseGetCursosMini,
    ]:[
        GetCatalogoRolesType,
        GetCursosMiniType,
    ] = await Promise.all([
        getCatalogoRoles(token),
        getCursosMini(token),
    ]);

    if(!responseGetCatalogoRoles.success || !responseGetCursosMini.success){
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
                {responseGetCursosMini.cursos_mini.map((curso) => (
                    <li key={curso.id}>
                        <Curso
                            className='divider-dark p-1'
                            curso={curso}
                            widthList={widths}
                            catalogoRoles={responseGetCatalogoRoles.catalogo_roles}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MisCursos;
