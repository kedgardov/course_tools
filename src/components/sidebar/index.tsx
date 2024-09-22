import SidebarClient from './sidebar';

const SidebarServer = async ( { className }:{ className: string } ) => {

    return (
        <SidebarClient
        />
    );
};

export default SidebarServer;
