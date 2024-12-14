import DocentesNavbar from "@/components/docentesNavbar";
import { parseId } from "@/utils/parseId";
import { notFound } from "next/navigation";

const DocenteLayout = ({
    children,
    params,
}:{
    children: React.ReactNode,
    params: {
        id_docente: string,
    },
}) => {

    const idDocente = parseId(params.id_docente);
    if( !idDocente ){
        notFound();
    }

    return (
        <div>
            <DocentesNavbar idDocente={idDocente} />
            <div>{children}</div>
        </div>
    );
};
export default DocenteLayout;
