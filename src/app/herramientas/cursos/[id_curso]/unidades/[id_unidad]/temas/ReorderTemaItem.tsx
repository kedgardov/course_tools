// components/ReorderTemaItem.tsx
'use client';

import { Reorder, useDragControls } from 'framer-motion';
import Tema from './tema';
import { TemaType } from '@models/tema';
import WidthType from '@/models/width';
import { DragControls } from 'framer-motion';

type ReorderTemaItemProps = {
    tema: TemaType;
    idCurso: number;
    idUnidad: number;
    handleDeleteTema: (id: number) => void;
    widthList: [WidthType, WidthType, WidthType];
    token: string;
};

const ReorderTemaItem = ({
    tema,
    idCurso,
    idUnidad,
    handleDeleteTema,
    widthList,
    token,
}: ReorderTemaItemProps) => {
    const dragControls = useDragControls(); // Unique drag controls for each item

    return (
        <Reorder.Item
            key={tema.id}
            value={tema.id}
            dragListener={false} // Disable default drag listener
            dragControls={dragControls} // Attach unique drag controls
            className=""
        >
            <Tema
                className="divider-dark p-1 flex items-center"
                tema={tema}
                idCurso={idCurso}
                idUnidad={idUnidad}
                handleDeleteTema={handleDeleteTema}
                widthList={widthList}
                token={token}
                dragControls={dragControls} // Pass drag controls to Tema
            />
        </Reorder.Item>
    );
};

export default ReorderTemaItem;
