import LoadingTextInputLabel from '@/components/textInputLabel/loading';
import LoadingSelectInputLabel from '@components/selectInputLabel/loading';

const DatosBasicosLoading = () => {
    return (
        <div className='border p-2'>
            <div className='title-2'>Datos Basicos</div>
            <LoadingTextInputLabel
                className='m-2'
                widthLabel='w-40'
                widthInput='w-full'
            />
            <div className='flex'>
                <LoadingSelectInputLabel
                    className='m-2'
                    widthLabel='w-40'
                    widthInput='w-40'
                />
                <LoadingSelectInputLabel
                    className='m-2'
                    widthLabel='w-40'
                    widthInput='w-40'
                />
            </div>
        </div>
    );
};

export default DatosBasicosLoading;
