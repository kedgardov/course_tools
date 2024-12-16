'use client'
import React, { useState } from "react";
import { EncargadoType } from "@/models/encargado";
import { MaestroType } from "@/models/maestro";
import ListHeaders from "@/components/listHeaders";
import WidthType from "@/models/width";

// Define the Coolaborador interface
interface Coolaborador {
  encargado: EncargadoType;
  participo: boolean;
}

const CoolaboradoresCurso = ({
  className,
  idCurso,
  coolaboradores,
  catalogoMaestros,
}: {
  className: string;
  idCurso: number;
  coolaboradores: EncargadoType[];
  catalogoMaestros: MaestroType[];
}) => {

    const headers = ['Participante','Participo'];
    const widths: WidthType[] = ['w-[80%]','w-[20%]'];
  // Initialize state to track checked encargados
  const [checkedEncargados, setCheckedEncargados] = useState<Coolaborador[]>(
    coolaboradores.map((encargado) => ({
      encargado,
      participo: true,
    }))
  );

  // Handle checkbox toggle
  const handleCheckboxChange = (id: number) => {
    setCheckedEncargados((prevState) =>
      prevState.map((item) =>
        item.encargado.id === id
          ? { ...item, participo: !item.participo }
          : item
      )
    );
  };

  return (
    <div className={`${className}`}>
      <h2 className="title-2">Participantes en la Actualizacion</h2>
      <ListHeaders
        className=''
        headersList={headers}
        widthList={widths}
      />
      <form>
        {checkedEncargados.map((coolaborador) => (
          <div key={coolaborador.encargado.id} className="flex p-2 divider-dark">
            <div className={`${widths[0]}`}>
              {
                catalogoMaestros.find(
                  (m) => m.id === coolaborador.encargado.id_maestro
                )?.label
              }
            </div>

            <div className={`${widths[1]}`}>
              <input
                type="checkbox"
                checked={coolaborador.participo}
                onChange={() => handleCheckboxChange(coolaborador.encargado.id)}
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default CoolaboradoresCurso;
