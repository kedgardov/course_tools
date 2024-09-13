import ListHeaders from "@/components/listHeaders";
import WidthType from "@/models/width";

const LoadingCoordinaciones = ({
    className,
}:{
    className: string,
}) => {
    const widthList: [WidthType, WidthType] = ['w-[50%]', 'w-[50%]'];
    return (
        <div className={className}>
            <h2 className='title-2'>Coordinaciones</h2>
            <ListHeaders
                headersList={['Coordinacion','Acciones']}
                widthList={widthList}
                className=''
            />
            <div className='flex m-1 h-8'>
                <div className={`${widthList[0]} mx-2 loading`}></div>
                <div className={`${widthList[1]} mx-2 loading`}></div>
           </div>
            <div className='flex m-1 h-8'>
                <div className={`${widthList[0]} mx-2 loading`}></div>
                <div className={`${widthList[1]} mx-2 loading`}></div>
           </div>

        </div>
    );
}

export default LoadingCoordinaciones;
