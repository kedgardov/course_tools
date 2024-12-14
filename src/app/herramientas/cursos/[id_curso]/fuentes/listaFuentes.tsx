import { AutorFuenteType, FuenteType } from "@/models/fuente";
import Fuente from "./fuente";
import WidthType from "@/models/width";
import ListHeaders from "@/components/listHeaders";

const widths: WidthType[] = ['w-[80%]','w-[20%]'];


const ListaFuentesCurso = ({
    className,
    token,
    idCurso,
    fuentes,
    autores,
}:{
    className: string,
    token: string,
    idCurso: number,
    fuentes: FuenteType[],
    autores: AutorFuenteType[],
}) => {
  return (
    <div className={`${className}`}>
      <h2 className='title-2'>Fuentes del Curso</h2>
    <ul className='p-2'>
      <ListHeaders
          className=''
          widthList={widths}
          headersList={['Cita','Acciones']}
      />
      {fuentes.map((fuente) => (
        <Fuente
          key={fuente.id}
          className='divider-dark p-2'
          fuenteData={fuente}
          autoresData={ autores.filter((a) => a.id_fuente === fuente.id) }
          widths={widths}
        />
      ))}
    </ul>
    </div>
  );
};

export default ListaFuentesCurso;
