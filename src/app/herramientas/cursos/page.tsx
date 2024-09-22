import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getCatalogoCursosMini, GetCatalogoCursosMiniType } from '@/utils/cursos/getCatalogoCursosMini';
import CursosFinder from './cursosFinder';


const Cursos = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const responseGetCatalogoCursos: GetCatalogoCursosMiniType = await getCatalogoCursosMini(token);

    if( !responseGetCatalogoCursos.success){
        return notFound();
    }

    return (
        <CursosFinder
            className=''
            catalogoCursos={responseGetCatalogoCursos.catalogo_cursos_mini}
        />
    );
};

export default Cursos;
