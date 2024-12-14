'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { catalogoTiposFuentes, FuenteDataScheme, FuenteDataType } from '@/models/fuente';
import SelectInputLabel from '@/components/selectInputLabel';
import TextInputLabel from '@/components/textInputLabel';
import NumberInputLabel from '@/components/numberInputLabel';
import SecondarySubmit from '@/components/secondarySubmit';
import TertiaryButton from '@/components/tertiaryButton';


import { Cite } from '@citation-js/core';
import '@citation-js/plugin-csl';

interface CSLDate {
  'date-parts': number[][];
}

interface CSLName {
  family?: string;
  given?: string;
}

interface CSLData {
  id?: string;
  type: string;
  title?: string;
  DOI?: string;
  issued?: CSLDate;
  accessed?: CSLDate;
  publisher?: string;
  'publisher-place'?: string;
  volume?: string;
  issue?: string;
  page?: string;
  URL?: string;
  author?: CSLName[];
  [key: string]: any;
}

   // Define the fields relevant to each type
  const typeFieldsMap: { [key: number]: (keyof FuenteDataType)[] } = {
    1: ['publisher', 'publisher_place'], // Book
    2: ['publisher', 'volume', 'issue', 'pages'], // Journal Article
    3: ['institution'], // Thesis
    4: ['URL', 'accessed'], // Webpage
  };

  // List of all optional fields
  const allOptionalFields: (keyof FuenteDataType)[] = [
    'publisher',
    'publisher_place',
    'volume',
    'issue',
    'pages',
    'institution',
    'URL',
    'accessed',
    // Add other optional fields if necessary
  ];




const FuenteForm = ({
    params,
}:{
    params: {
        id_curso: string,
        id_fuente: string,
    },
}) => {


  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isDirty },
  } = useForm<FuenteDataType>({
    resolver: zodResolver(FuenteDataScheme),
  });


  const [ citation, setCitation ] = useState<string | null>(null);


  const selectedIdTipo = watch('id_tipo') !== undefined ? watch('id_tipo') : null;

   useEffect(() => {
    // When id_tipo changes, reset irrelevant fields
    if (selectedIdTipo !== null) {
      const relevantFields = typeFieldsMap[selectedIdTipo] || [];
      const fieldsToReset = allOptionalFields.filter((field) => !relevantFields.includes(field));

      // Reset the irrelevant fields
      fieldsToReset.forEach((field) => {
        resetField(field);
      });
    }
  }, [selectedIdTipo, resetField]);


  const renderFieldsBasedOnTipo = (id_tipo: number) => {
    switch (id_tipo) {
      case 1: // Book
        return (
          <div className='flex space-x-2'>
            <div className='w-1/2'>
              <TextInputLabel
                  className=''
                  idPrefix='editorial-fuente'
                  idRaw='0'
                  label='Editorial'
                  helpText=''
                  editMode={true}
                  register={register('publisher')}
                  placeholder='Ingrese el Editorial de la Fuente'
                  error={errors.publisher}
                  showBorder={true}
              />
            </div>
            <div className='w-1/2'>
              <TextInputLabel
                  className=''
                  idPrefix='lugar-publicacion'
                  idRaw='0'
                  label='Lugar de Publicación'
                  helpText=''
                  editMode={true}
                  register={register('publisher_place')}
                  placeholder='Ingrese el lugar de publicacion'
                  error={errors.publisher_place}
                  showBorder={true}
              />
            </div>
          </div>
        );

      case 2: // Journal Article
        return (
          <>
            <TextInputLabel
                className=''
                idPrefix='nombre-journal'
                idRaw='0'
                label='Nombre del Journal'
                helpText=''
                editMode={true}
                register={register('publisher')}
                placeholder='Ingrese el nombre del journal'
                error={errors.publisher}
                showBorder={true}
            />
            <div className='flex space-x-2'>
            <TextInputLabel
                className='w-1/3'
                idPrefix='volumen'
                idRaw='0'
                label='Volumen'
                helpText=''
                editMode={true}
                register={register('volume')}
                placeholder='Ingrese el volumen'
                error={errors.volume}
                showBorder={true}
            />
            <TextInputLabel
                className='w-1/3'
                idPrefix='numero-issue'
                idRaw='0'
                label='Número (Issue)'
                helpText=''
                editMode={true}
                register={register('issue')}
                placeholder='Ingrese el número de la publicación'
                error={errors.issue}
                showBorder={true}
            />
            <TextInputLabel
                className='w-1/3'
                idPrefix='paginas'
                idRaw='0'
                label='Páginas'
                helpText=''
                editMode={true}
                register={register('pages')}
                placeholder='Ingrese las páginas'
                error={errors.pages}
                showBorder={true}
            />
            </div>
          </>
        );

      case 3: // Thesis
        return (
          <TextInputLabel
              className=''
              idPrefix='institucion-fuente'
              idRaw='0'
              label='Institución'
              helpText=''
              editMode={true}
              register={register('institution')}
              placeholder='Ingrese la institución'
              error={errors.institution}
              showBorder={true}
          />
        );

      case 4: // Webpage
        return (
          <>
            <TextInputLabel
                className=''
                idPrefix='url'
                idRaw='0'
                label='URL'
                helpText=''
                editMode={true}
                register={register('URL')}
                placeholder='Ingrese la URL'
                error={errors.URL}
                showBorder={true}
            />
            <div className='flex flex-col w-fit p-1'>
              <label htmlFor='fecha'>Fecha de Acceso</label>
              <input id='fecha' className='input border' type='date' {...register('accessed')} disabled={false} />
              {errors.accessed && <p className='error-text'>{errors.accessed.message}</p>}
          </div>
          </>
        );
      default:
        return (
          <>
         </>
        );
    }
  };



function mapToCSLJSON(data: FuenteDataType): CSLData {
  // Find the CSL type based on id_tipo
  const tipoFuente = catalogoTiposFuentes.find((tf) => tf.id === data.id_tipo);
  const cslType = tipoFuente?.tipo_fuente_type || 'book'; // Default to 'book' if not found

  // Initialize CSL data object
  const cslData: CSLData = {
    type: cslType,
    title: data.title,
  };

  // Map optional fields if they exist
  if (data.DOI) {
    cslData.DOI = data.DOI;
  }

  if (data.issued) {
    cslData.issued = { 'date-parts': [[Number(data.issued)]] };
  }

  if (data.publisher) {
    if (cslType === 'thesis') {
      cslData.publisher = data.institution || data.publisher; // For theses, use institution as publisher
    } else {
      cslData.publisher = data.publisher;
    }
  }

  if (data.publisher_place) {
    cslData['publisher-place'] = data.publisher_place;
  }

  if (data.volume) {
    cslData.volume = data.volume;
  }

  if (data.issue) {
    cslData.issue = data.issue;
  }

  if (data.pages) {
    cslData.page = data.pages;
  }

  if (data.URL) {
    cslData.URL = data.URL;
  }

  if (data.accessed) {
    const date = new Date(data.accessed);
    if (!isNaN(date.getTime())) {
      cslData.accessed = {
        'date-parts': [[date.getFullYear(), date.getMonth() + 1, date.getDate()]],
      };
    }
  }

  cslData.author = [{ family: 'Doe', given: 'John' }];

  // Return the CSL data object
  return cslData;
}

  const onSubmit = (data: FuenteDataType) => {
    console.log(data);
    const cslData = mapToCSLJSON(data);
    const cite = new Cite(cslData);
    const apaCitation = cite.format('bibliography', {
      format: 'html',
      template: 'apa',
      lang: 'en-US',
    });
    setCitation(apaCitation);
  };
  return (
    <>
    <form className='space-y-2' onSubmit={handleSubmit(onSubmit, (errors) => console.log('Validation Errors:',errors))}>
      <h1 className='title-2'>Detalles de la Fuente</h1>

      <SelectInputLabel
          className='w-1/4 min-w-60'
          idPrefix='tipo-fuente'
          idRaw='0'
          label='Tipo de Fuente'
          helpText=''
          register={register('id_tipo', { valueAsNumber: true })}
          editMode={true}
          options={catalogoTiposFuentes}
          error={errors.id_tipo}
          placeholder='Seleccione el tipo de fuente'
          idKey='id'
          valueKey='tipo_fuente'
          showBorder={true}
      />

      {selectedIdTipo !== null && (
        <>
          <TextInputLabel
              className=''
              idPrefix='titulo-fuente'
              idRaw='0'
              label='Titulo de la Fuente'
              helpText=''
              editMode={true}
              register={register('title')}
              placeholder='Ingrese el título de la fuente'
              error={errors.title}
              showBorder={true}
          />
          <NumberInputLabel
              className='w-1/4 min-w-60'
              idPrefix='fecha-publicacion-fuente'
              idRaw='0'
              label='Año de Publicación'
              helpText=''
              editMode={true}
              register={register('issued', { valueAsNumber: false, setValueAs: (value) => value === '' ? undefined : Number(value) })}
              placeholder='Ingrese el año de publicación'
              error={errors.issued}
              showBorder={true}
          />
          {renderFieldsBasedOnTipo(selectedIdTipo)}
        </>
      )}

    <div className='space-x-2'>
      <SecondarySubmit className='' buttonLabel='Guardar' isDirty={isDirty} />
      <TertiaryButton className='' buttonLabel='Cancelar' handleAction={() => console.log('cancelar')} />
      </div>
      </form>
      <div>{citation && <span dangerouslySetInnerHTML={{ __html: citation }} />}</div>
      </>
  );
};

export default FuenteForm;
