import Sidebar from '@components/sidebar';
import LoadingSidebar from '@components/sidebar/loadingSidebar';
import Footer from '@components/footer';
import Navbar from '@components/navbar';
import { Suspense } from 'react';

//<main className="flex-grow p-4 flex flex-col border border-purple-500 h-full overflow-auto">
//<div className="border border-red-500 flex h-screen w-full overflow-hidden">

const FacultadesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen">
      <Suspense fallback={<LoadingSidebar className="" />}>
        <Sidebar className="" />
      </Suspense>
      <div className="flex flex-col flex-grow min-h-screen bg-gradient-radial from-more-light to-more-light">
        <Navbar className="h-auto" />
        <main className="flex-grow p-4 flex flex-col h-full">
          {children}
        </main>
        <Footer className="flex justify-center h-auto" />
      </div>
    </div>
  );
};

export default FacultadesLayout;
