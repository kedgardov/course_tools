import { FuenteMiniType } from '@models/fuente';
import { TipoFuenteType } from '@models/tipoFuente';
import { parseId } from '@utils/parseId';
import { notFound } from 'next/navigation';
import ListaFuentes from './listaFuentes';

const Fuentes = ({ params }:{ params:{ id_curso: string }}) => {

    const idCurso = parseId(params.id_curso);
    if(!idCurso){
        notFound();
    }

    const fuentes: FuenteMiniType[] = [
    {
        id: 1,
        id_curso: idCurso,
        id_tipo: 1, // Libro
        cita: 'Doe, J. (2021). The Great Book. Famous Publisher.',
        titulo: 'The Great Book',
    },{
        id: 2,
        id_curso: idCurso,
        id_tipo: 2, // Articulo Cientifico
        cita: 'Smith, A. (2022). Groundbreaking Research. Journal of Important Studies, 8(2), 101-110. https://doi.org/10.1234/jis.2022.010',
        titulo: 'Groundbreaking Research',
    },{
        id: 3,
        id_curso: idCurso,
        id_tipo: 3, // Revista Cientifica
        cita: 'Brown, E. (2020). Advances in Technology. Scientific Magazine, 15(4), 50-60.',
        titulo: 'Advances in Technology',
    },{
        id: 4,
        id_curso: idCurso,
        id_tipo: 4, // Pagina Web
        cita: 'Johnson, C. (2023). Understanding Web Development. Retrieved August 15, 2023, from https://example.com/web-development',
        titulo: 'Understanding Web Development',
    }];


    const catalogoTiposFuentes: TipoFuenteType[] = [
        {id:1, tipo_fuente: 'Libro'},
        {id:2, tipo_fuente: 'Articulo Cientifico'},
        {id:3, tipo_fuente: 'Revista Cientifica'},
        {id:4, tipo_fuente: 'Pagina Web'},
    ];

    return (
        <section>
            <h2 className='title-2'>Lista de fuentes</h2>
            <ListaFuentes
                className=''
                idCurso={idCurso}
                fuentes={fuentes}
                catalogoTiposFuentes={catalogoTiposFuentes}
            />
        </section>
    );
};

export default Fuentes;
