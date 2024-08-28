'use client'
import { useState, useEffect } from 'react';

// Existing utility functions here...
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


// Existing utility functions...

// Convert hex color to HSL
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// Determine if a color is warm or cool
function isWarmColor(hue: number): boolean {
  return hue >= 0 && hue <= 180; // Warm colors range from 0° to 180° on the hue circle
}


interface ExampleButtonProps {
  color1: string; // Hex or RGB color value for the first gradient color
  color2: string; // Hex or RGB color value for the second gradient color
  textColor: string; // Hex or RGB color value for the text color
}

const ExampleButton = ({ color1, color2, textColor }:ExampleButtonProps) => {
  return (
    <button
      className="m-2 px-2 py-1 rounded shadow-sm"
      style={{
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
        color: textColor,
      }}
    >
      Example Button
    </button>
  );
};

interface ScreenGradientProps {
  color1: string; // Hex or RGB color value for the first gradient color
  color2: string; // Hex or RGB color value for the second gradient color
}

const ScreenGradient = ({ color1, color2 }:ScreenGradientProps) => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
      }}
    >
      Example
    </div>
  );
};




interface HoverButtonProps {
  color1: string; // Initial gradient color start
  color2: string; // Initial gradient color end and hover start
  color3: string; // Hover gradient color end
  textColor: string; // Text color
}

const HoverButton = ({ color1, color2, color3, textColor }:HoverButtonProps) => {
  return (
    <button
      className="m-2 px-2 py-1 rounded shadow-sm transition-all duration-500"
      style={{
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.background = `radial-gradient(circle, ${color3} 0%, ${color1} 100%)`;
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.background = `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`;
      }}
    >
      Hover Button
    </button>
  );
};


const ContrastChecker: React.FC = () => {
    const [tab, setTab] = useState<string>('constrastes');
  const [colors, setColors] = useState<string[]>([
    '#3A5CF7', '#2B42F3', '#2438D3',
    '#33813F', '#107329', '#0C6322',
    '#BE4042', '#B1222E', '#991C27',
    '#40404B', '#2E2E3A', '#1F1F28',
    '#FFFFFF', '#FAFAFA', '#F5F5F5'
  ]);
  const colorNames: string[] = [
    'primary-light', 'primary','primary-dark',
    'secondary-light', 'secondary','secondary-dark',
    'tertiary-light', 'tertiary','tertiary-dark',
    'less-dark', 'dark','more-dark',
    'more-light', 'light','less-light',
  ];
  const [contrastResults, setContrastResults] = useState<any[]>([]);
  const [mostContrast, setMostContrast] = useState<string>('#2E2E3A');
  const [warmCoolBalance, setWarmCoolBalance] = useState<string>('');

  useEffect(() => {
    let maxContrastColor = colors[0];
    let maxContrastRatio = 0;
    let warmColors = 0;
    let coolColors = 0;

    colors.forEach(color => {
      const contrastRatio = getContrastRatio(color, '#D6DBDC');
      if (contrastRatio > maxContrastRatio) {
        maxContrastRatio = contrastRatio;
        maxContrastColor = color;
      }

      const [hue] = hexToHsl(color);
      if (isWarmColor(hue)) {
        warmColors++;
      } else {
        coolColors++;
      }
    });

    setMostContrast(maxContrastColor);
    setWarmCoolBalance(`Warm: ${warmColors}, Cool: ${coolColors}`);
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
            name: `[${colorNames[i]}]-[${colorNames[j]}]`,
          });
        }
      }
    }

    results.sort((a, b) => b.ratio - a.ratio);
    setContrastResults(results);
  };

  return (
    <div className='flex-grow'>
    <nav className='flex shadow' >
          <button className={`p-2 border ${tab === 'constrastes'? 'underline' : ''}`} onClick={()=> setTab('constrastes')}>Constrastes</button>
          <button className={`p-2 border ${tab === 'botones'? 'underline' : ''}`} onClick={()=> setTab('botones')}>Botones</button>
          <button className={`p-2 border ${tab ==='fondos'? 'underline' : ''}`} onClick={()=> setTab('fondos')}>Fondos</button>
    </nav>
      <h1 className='text-4xl font-bold text-center p-2 m-2' style={{ color: mostContrast }}>
        Paleta de Colores
      </h1>
      <p className="text-center mb-4">{warmCoolBalance}</p>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 gap-4'>
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex flex-col justify-end items-center p-4 h-[10rem]"
              style={{ backgroundColor: color, color: getBestContrastColor(color) }}
            >
              <label htmlFor={`color${index}`} className="mb-2 text-center uppercase">{colorNames[index]}</label>
              <input
                type="text"
                id={`color${index}`}
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                placeholder="#0000FF"
                required
                className="my-2 p-2 border rounded-md hover:bg-gray-500 hover:bg-opacity-50"
                style={{ backgroundColor: color, color: getBestContrastColor(color), borderColor: getBestContrastColor(color), borderWidth: '2px' }}
              />
              <p>{hexToRgbString(color)}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <button type="submit" className="border rounded-md shadow-lg mt-4 p-2 bg-blue-500 text-white">Analizar Contrastes</button>
        </div>
      </form>
    {tab === 'constrastes' && (
      <div className="mt-4">
        {contrastResults.map((result, index) => (
          result.ratio >= 4.4 && (
          <div key={index} className="flex m-2 p-2" style={{ backgroundColor: result.backgroundColor }}>
            <p className="text-lg" style={{ color: result.foregroundColor }}>
            {`Constraste ${result.name}: ${result.ratio.toFixed(2)}`}
            </p>
          </div>
          )))}
      </div>
    )}
    {tab === 'botones' && (
    <div className='flex items-center justify-center m-6'>
          <ExampleButton color1={colors[1]} color2={colors[0]} textColor={colors[14]} />
          <ExampleButton color1={colors[2]} color2={colors[1]} textColor={colors[14]} />
          <HoverButton color1={colors[1]} color2={colors[0]} color3={colors[2]} textColor={colors[14]} />

          <ExampleButton color1={colors[4]} color2={colors[3]} textColor={colors[14]} />
          <ExampleButton color1={colors[5]} color2={colors[4]} textColor={colors[14]} />
          <HoverButton color1={colors[4]} color2={colors[3]} color3={colors[5]} textColor={colors[14]} />

          <ExampleButton color1={colors[7]} color2={colors[6]} textColor={colors[14]} />
          <ExampleButton color1={colors[8]} color2={colors[7]} textColor={colors[14]} />
          <HoverButton color1={colors[7]} color2={colors[6]} color3={colors[8]} textColor={colors[14]} />

    </div>
    )}
     {tab === 'fondos' && (
    <div>
          <ScreenGradient color1={colors[1]} color2={colors[0]} />
          <ScreenGradient color1={colors[2]} color2={colors[1]} />

          <ScreenGradient color1={colors[4]} color2={colors[3]} />
          <ScreenGradient color1={colors[5]} color2={colors[4]} />

          <ScreenGradient color1={colors[7]} color2={colors[6]} />
          <ScreenGradient color1={colors[8]} color2={colors[7]} />

    </div>
     )}
    </div>
  );
};

export default ContrastChecker;
