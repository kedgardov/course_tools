import Sidebar from '@components/sidebar';
import LoadingSidebar from '@components/sidebar/loadingSidebar';
import Footer from '@components/footer';
import Navbar from '@components/navbar';
import { Suspense } from 'react';



const HerramientasLayout = ({ children }: { children: React.ReactNode }) => {
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

export default HerramientasLayout;
