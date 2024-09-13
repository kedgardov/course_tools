import { cookies } from "next/headers";
import ListaCursosServer from "./listaCursos"

const Facultades = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value || '';

    return (
        <ListaCursosServer
            className=''
            token={token}
        />
    );
};

export default Facultades;
