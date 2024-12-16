'use client';

import { useState } from "react";
import PrimaryButton from "@/components/primaryButton";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation"; // Adjust this import based on your Next.js version

interface JustificacionCursoProps {
    className: string;
    idCurso: number;
}

const JustificacionCurso: React.FC<JustificacionCursoProps> = ({ className, idCurso }) => {
    const router = useRouter();

    // State to manage the visibility of the confirmation modal
    const [showConfirm, setShowConfirm] = useState(false);

    // State to manage the content of the justification textarea
    const [justificacion, setJustificacion] = useState("");

    // State to manage error messages
    const [error, setError] = useState<string | null>(null);

    // Handler for the "Actualizar Curso" button click
    const handleActualizarClick = () => {
        if (justificacion.trim() === "") {
            setError("Por favor, ingrese una justificación antes de actualizar el curso.");
            return;
        }
        setShowConfirm(true);
    };

    // Handler when the user confirms the action
    const handleConfirm = () => {
        setShowConfirm(false);
        try {
            // TODO: Add your further logic here (e.g., API calls)

            // Redirect to /herramientas/mis-cursos
            router.push('/herramientas/mis-cursos');
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al intentar redirigir.');
        }
    };

    // Handler when the user cancels the action
    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div className={className}>
            <h2 className='title-2'>Justificación de los Cambios</h2>
            <textarea
                className='w-full border rounded h-48 p-2'
                value={justificacion}
                onChange={(e) => setJustificacion(e.target.value)}
                placeholder="Ingrese la justificación de los cambios aquí..."
            ></textarea>
            <PrimaryButton
                className='ml-auto mt-4'
                buttonLabel='Actualizar Curso'
                handleAction={handleActualizarClick}
            />

            {/* Display Error Message */}
            {error && (
                <Alert error={error} setError={setError} />
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
                        <p className="mb-6">¿Estás seguro de que deseas enviar la actualización de este curso?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Terminar
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JustificacionCurso;
