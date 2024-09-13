import ListHeaders from "@/components/listHeaders";
import WidthType from "@/models/width";

const LoadingOpcionesTerminales = ({
    className,
}:{
    className: string,
}) => {
    const widthList: [WidthType, WidthType, WidthType, WidthType] = ['w-[30%]', 'w-[25%]', 'w-[25%]', 'w-[20%]'];
    return (
        <div className={className}>
            <h2 className='title-2'>Opciones Terminales</h2>
            <ListHeaders
                headersList={['Opcion Terminal','Programa','Nivel Academico','Acciones']}
                widthList={widthList}
                className=''
            />
            <div className='flex m-1 h-8'>
                <div className={`${widthList[0]} mx-2 loading`}></div>
                <div className={`${widthList[1]} mx-2 loading`}></div>
                <div className={`${widthList[2]} mx-2 loading`}></div>
                <div className={`${widthList[3]} mx-2 loading`}></div>
           </div>
            <div className='flex m-1 h-8'>
                <div className={`${widthList[0]} mx-2 loading`}></div>
                <div className={`${widthList[1]} mx-2 loading`}></div>
                <div className={`${widthList[2]} mx-2 loading`}></div>
                <div className={`${widthList[3]} mx-2 loading`}></div>
           </div>

        </div>
    );
}

export default LoadingOpcionesTerminales;
