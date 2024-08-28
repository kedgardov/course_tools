import { cookies } from 'next/headers';
import { getCursosMini, GetCursosMiniType } from '@utils/cursos/getCursosMini';
import SidebarClient from './sidebar';


const SidebarServer = async ( { className }:{ className: string } ) => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    const response: GetCursosMiniType = await getCursosMini(token);

    return (
        <SidebarClient
            className=''
            cursosMini={response.cursos_mini}
        />
    );
};

export default SidebarServer;
