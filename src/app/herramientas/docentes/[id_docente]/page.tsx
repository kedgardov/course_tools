import { getCatalogoRolesTesis, GetCatalogoRolesTesisType } from "@/utils/maestros/getCatalogoRolesTesis";
import { getMaestro, GetMaestroType } from "@/utils/maestros/getMaestro";
import { getTesisMaestro, GetTesisMaestroType } from "@/utils/maestros/getTesisDocente";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import DetallesDocenteForm from "./docenteForm";
import ListaTesis from "./tesisList";

const DetallesDocente = async ({
    params,
}:{
    params:{ id_docente: string }
}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';
    if ( token === '' ){
        notFound();
    }

    const idDocente = parseId(params.id_docente);
    if ( !idDocente ){
        notFound();
    }

    const [
        responseGetMaestro,
        responseGetCatalogoRolesTesis,
        responseGetTesisMaestro,
    ]:[
        GetMaestroType,
        GetCatalogoRolesTesisType,
        GetTesisMaestroType,
    ] = await Promise.all([
        getMaestro(idDocente, token),
        getCatalogoRolesTesis(token),
        getTesisMaestro(idDocente, token),
    ]);

    //console.log(responseGetTesisMaestro);

    if( !responseGetMaestro.success || !responseGetCatalogoRolesTesis.success || !responseGetTesisMaestro.success || !responseGetMaestro.maestro ){
        console.log(`getMaestro: ${responseGetMaestro.success}`);
        console.log(`getCatalogoRolesTesis: ${responseGetCatalogoRolesTesis.success}`);
        console.log(`getTesisMaestro: ${responseGetTesisMaestro.success}`);
        return notFound();
    }


    const pronaceList = [
  { id: 1, pronace: 'Agentes Tóxicos y Procesos Contaminantes' },
  { id: 2, pronace: 'Agua' },
  { id: 3, pronace: 'Cultura' },
  { id: 4, pronace: 'Educación' },
  { id: 5, pronace: 'Energía y Cambio Climático' },
  { id: 6, pronace: 'Salud' },
  { id: 7, pronace: 'Seguridad Humana' },
  { id: 8, pronace: 'Sistemas Socio-Ecológicos' },
  { id: 9, pronace: 'Soberanía Alimentaria' },
  { id: 10, pronace: 'Vivienda' },
  { id: 11, pronace: 'Otro' },
  { id: 12, pronace: 'Economía' },
  { id: 13, pronace: 'Materiales' },
];



    return (
        <div className='p-4'>
            <DetallesDocenteForm
                maestro={responseGetMaestro.maestro}
            />
            <ListaTesis
                className='m-2'
                token={token}
                tesisMini={responseGetTesisMaestro.tesis_maestro}
                pronaceList={pronaceList}
                catalogoRolesTesis={responseGetCatalogoRolesTesis.catalogo_roles_tesis}
            />
        </div>
    );
};
export default DetallesDocente;
