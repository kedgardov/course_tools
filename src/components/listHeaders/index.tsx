import WidthType from '@models/width';

const ListHeaders = ({
    className,
    headersList,
    widthList,
}:{
    className: string,
    headersList: string[],
    widthList: WidthType[],
}) => {

    return (
        <li className={`${className} list-title flex divider-dark `}>
            {headersList.map((columnName, index) => (
                <span
                    key={index}
                    className={widthList[index]? widthList[index] : 'w-fit'}
                >
                    {columnName}
                </span>
            ))}
        </li>
    );
};

export default ListHeaders;
