import Sidebar from '../../components/sidebar/sidebar';
import LoadingSidebar from '../../components/sidebar/loadingSidebar';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import { Suspense } from 'react';



const CursosLayout = ({ children } : { children: React.ReactNode }) => {

  return (
    <>
      <Suspense fallback={<LoadingSidebar className='w-80'/>}>
      <Sidebar className='w-80'/>
      </Suspense>
      <div className='flex flex-col flex-grow min-h-screen'>
          <Navbar className='border'/>
          <main className='flex-grow border'> {children} </main>
          <Footer className='flex justify-center border'/>
        </div>
      </>
  );

};

export default CursosLayout;
