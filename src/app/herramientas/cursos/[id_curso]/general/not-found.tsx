import Link from 'next/link';

const Cursos404 = () => {


    return (
        <div className="flex flex-col min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-4">Curso no encontrado</h1>
            <p className="mb-4">El curso que estás buscando no existe o no tienes permisos para acceder a el.</p>
            <Link className='border w-fit p-2 rounded bg-primary-1 text-light-1' href='/herramientas/mis-cursos'>
                Regresar
            </Link>
        </div>
    );
};

export default Cursos404;
