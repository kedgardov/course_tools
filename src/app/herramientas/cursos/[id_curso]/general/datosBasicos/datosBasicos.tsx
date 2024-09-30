import DatosBasicosForm from './datosBasicosForm';
import { getCurso, GetCursoType } from '@/utils/cursos/getCurso';
import { getCatalogoTipos, GetCatalogoTiposType } from '@/utils/cursos/getCatalogoTipos';
import { getCatalogoModalidades, GetCatalogoModalidadesType } from '@/utils/cursos/getCatalogoModaliades';
import { notFound } from 'next/navigation';



const DatosBasicosComponent = async ({
    idCurso,
    className,
    token,
}:{
    className: string,
    idCurso: number,
    token: string,
}) => {

    const [
        getCursoResponse,
        getCatalogoTiposResponse,
        getCatalogoModalidadesResponse,
    ]:[
        GetCursoType,
        GetCatalogoTiposType,
        GetCatalogoModalidadesType,
    ] = await Promise.all([
        getCurso(idCurso, token),
        getCatalogoTipos(token),
        getCatalogoModalidades(token),
    ]);

    if( !getCursoResponse.curso || !getCatalogoTiposResponse.success || !getCatalogoModalidadesResponse.success || !getCursoResponse.success ){
        notFound();
    }

    return (
        <DatosBasicosForm
            className={className}
            idCurso={idCurso}
            token={token}
            curso={getCursoResponse.curso}
            catalogoTiposCursos={getCatalogoTiposResponse.catalogo_tipos}
            catalogoModalidadesCursos={getCatalogoModalidadesResponse.catalogo_modalidades}
        />
    );
};

export default DatosBasicosComponent;
