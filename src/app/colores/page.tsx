'use client'
import { useState, useEffect } from 'react';

// Convert sRGB to linear light (luminance)
function sRGBtoLinear(value: number): number {
  value /= 255;
  return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const linearR = sRGBtoLinear(r);
  const linearG = sRGBtoLinear(g);
  const linearB = sRGBtoLinear(b);
  return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

// Convert hex color to RGB
function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Convert hex color to RGB string
function hexToRgbString(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

// Calculate contrast ratio
function getContrastRatio(hex1: string, hex2: string): number {
  const color1 = hexToRgb(hex1);
  const color2 = hexToRgb(hex2);
  const lum1 = getLuminance(color1[0], color1[1], color1[2]) + 0.05;
  const lum2 = getLuminance(color2[0], color2[1], color2[2]) + 0.05;
  return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
}

// Determine whether black or white has higher contrast
function getBestContrastColor(hex: string): string {
  const blackContrast = getContrastRatio(hex, '#000000');
  const whiteContrast = getContrastRatio(hex, '#FFFFFF');
  return blackContrast > whiteContrast ? '#000000' : '#FFFFFF';
}

const ContrastChecker: React.FC = () => {
  const [colors, setColors] = useState<string[]>(['#BB2532', '#007a2b', '#2b42f3', '#2E2E3A', '#F0F0F0','#CFD7C7']);
  const [contrastResults, setContrastResults] = useState<any[]>([]);
  const [mostContrast, setMostContrast] = useState<string>('#2E2E3A');

  useEffect(()=>{
    let maxContrastColor = colors[0];
    let maxContrastRatio = 0;
    for (let color of colors) {
      const contrastRatio = getContrastRatio(color, '#D6DBDC');
      if (contrastRatio > maxContrastRatio) {
        maxContrastRatio = contrastRatio;
        maxContrastColor = color;
      }
    }
    console.log('Setting new color:', maxContrastColor);
    setMostContrast(maxContrastColor);
  }, [colors]);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results: any[] = [];

    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < colors.length; j++) {
        if (i !== j) {
          const ratio = getContrastRatio(colors[i], colors[j]);
          results.push({
            foregroundColor: colors[i],
            backgroundColor: colors[j],
            ratio,
          });
        }
      }
    }

    // Sort the results by highest to lowest contrast ratio
    results.sort((a, b) => b.ratio - a.ratio);

    setContrastResults(results);
  };

  return (
    <div className='flex-grow'>
      <h1
        className='text-4xl font-bold text-center p-2 m-2'
        style={{ color: mostContrast }}
      >
        Paleta de Colores
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex flex-col justify-end flex-grow items-center mb-2 p-2 h-[45rem]"
              style={{ backgroundColor: color, color: getBestContrastColor(color) }}
            >
              <label htmlFor={`color${index}`} className="mr-2"></label>
              <input
                type="text"
                id={`color${index}`}
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                placeholder="#0000FF"
                required
                className="my-10 p-2 border rounded-md hover:bg-gray-500 hover:bg-opacity-50"
                style={{ backgroundColor: color, color: getBestContrastColor(color), borderColor: getBestContrastColor(color), borderWidth: '2px' }}
              />
              <p>{hexToRgbString(color)}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-center flex-grow'>
          <button type="submit" className="border rounded-md shadow-lg mt-4 p-2 bg-blue-500 text-white">Analizar Contrastes</button>
        </div>
      </form>
      <div className="mt-4">
        {contrastResults.map((result, index) => (
          <div key={index} className="flex m-2 p-2" style={{ backgroundColor: result.backgroundColor }}>
            <p className="text-lg" style={{ color: result.foregroundColor }}>
              {`Ejemplo de Contraste: Texto 1 Contraste Ratio: ${result.ratio.toFixed(2)}`}
            </p>
            <p>{result.ratio >= 4.5 ? 'Pass' : 'Fail'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContrastChecker;
