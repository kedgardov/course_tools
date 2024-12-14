// utils/citation.ts

import { FuenteDataType, AutorFuenteType, catalogoTiposFuentes } from '@/models/fuente';
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

export function generateCitation(
  fuenteData: FuenteDataType,
  autoresData: AutorFuenteType[],
  style: string = 'apa',
  locale: string = 'en-US'
): string {
  // Map to CSLData
  const cslData = mapToCSLJSON(fuenteData, autoresData);

  // Create a new Cite instance
  const cite = new Cite(cslData);

  // Generate the citation
  const citation = cite.format('bibliography', {
    format: 'html',
    template: style,
    lang: locale,
  });

  return citation;
}

function mapToCSLJSON(
  fuenteData: FuenteDataType,
  autoresData: AutorFuenteType[]
): CSLData {
  // Find the CSL type based on id_tipo
  const tipoFuente = catalogoTiposFuentes.find((tf) => tf.id === fuenteData.id_tipo);
  const cslType = tipoFuente?.tipo_fuente_type || 'book'; // Default to 'book' if not found

  // Initialize CSL data object
  const cslData: CSLData = {
    type: cslType,
    title: fuenteData.title,
  };

  // Map optional fields if they exist
  if (fuenteData.DOI) {
    cslData.DOI = fuenteData.DOI;
  }

  if (fuenteData.issued) {
    cslData.issued = { 'date-parts': [[Number(fuenteData.issued)]] };
  }

  if (fuenteData.publisher) {
    if (cslType === 'thesis') {
      cslData.publisher = fuenteData.institution || fuenteData.publisher; // For theses, use institution as publisher
    } else {
      cslData.publisher = fuenteData.publisher;
    }
  }

  if (fuenteData.publisher_place) {
    cslData['publisher-place'] = fuenteData.publisher_place;
  }

  if (fuenteData.volume) {
    cslData.volume = fuenteData.volume;
  }

  if (fuenteData.issue) {
    cslData.issue = fuenteData.issue;
  }

  if (fuenteData.pages) {
    cslData.page = fuenteData.pages;
  }

  if (fuenteData.URL) {
    cslData.URL = fuenteData.URL;
  }

  if (fuenteData.accessed) {
    const date = new Date(fuenteData.accessed);
    if (!isNaN(date.getTime())) {
      cslData.accessed = {
        'date-parts': [[date.getFullYear(), date.getMonth() + 1, date.getDate()]],
      };
    }
  }

  // Map authors
  if (autoresData && autoresData.length > 0) {
    cslData.author = autoresData.map((autor) => ({
      family: autor.apellido,
      given: autor.nombre,
    }));
  }

  // Return the CSL data object
  return cslData;
}
