import SecondarySubmit from '@components/secondarySubmit';


const GuardarButton = ({
    className,
    isDirty,
}:{
    className: string,
    isDirty: boolean,
}) => {
    return (
        <SecondarySubmit
            className={className}
            isDirty={isDirty}
            buttonLabel='Guardar'
        />
    );
};

export default GuardarButton;
