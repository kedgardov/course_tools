import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Course Tools Ciad",
  description: "Plataforma para gestion de cursos del centro de investigacion en alimentacion y desarrollo",
};



const RootLayout = ({ children } : { children: React.ReactNode }) => {

  return (
    <html lang="es-MX">
      <body className='flex min-h-screen'>
        {children}
      </body>
    </html>
  );

};

export default RootLayout;
