import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Courses Tool",
  description: "Plataforma para gestion de cursos del centro de investigacion en alimentacion y desarrollo",
};


      //<body className='flex flex-col min-h-screen max-h-screen border border-green-400 min-w-screen max-w-screen'>

const RootLayout = ({ children } : { children: React.ReactNode }) => {

  return (
    <html lang="es-MX">
      <body className='flex flex-col min-h-screen text-dark'>
        {children}
      </body>
    </html>
  );

};

export default RootLayout;
