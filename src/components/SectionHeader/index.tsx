import EditButton from "../editButton";
import LoadingComponent from "../loading";

const SectionHeaders = ({
    className,
    sectionHeader,
    helpText,
    editMode,
    startEditMode,
    isLoading,
}:{
    className: string,
    sectionHeader: string,
    helpText: string,
    editMode: boolean,
    startEditMode: () => void,
    isLoading: boolean,
}) => {


    return (
        <div className={`${className} flex space-x-2 items-center`}>
            <h2 className='title-2'>{sectionHeader}</h2>
            {!editMode && <EditButton className='' handleEdit={startEditMode} title={helpText} />}
            <LoadingComponent isLoading={isLoading}/>
        </div>
    );
};
export default SectionHeaders;
