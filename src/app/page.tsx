import Link from "next/link";

const LandingPage = () => {
    return (
        <div className='relative min-h-screen flex'>
            {/* Background: Left 1/3 section */}
            <div className='w-1/3 min-h-screen bg-gradient-radial from-primary to-primary-light'></div>

            {/* Background: Right 2/3 section */}
            <div className='w-2/3 min-h-screen bg-gradient-radial from-light to-more-light'></div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-25"></div>

            {/* Modal overlay: Positioned absolutely in the center of the screen */}
            <div className='absolute inset-0 flex items-center justify-center'>
                {/* Modal container: Split into 1/3 and 2/3 */}
                <div className='w-2/3 h-[60%] bg-gradient-radial from-light to-more-light shadow-2xl border-0 rounded-xl flex relative'>
                    {/* Modal Left 1/3 section: For the logo */}
                    <div className='w-1/3 flex flex-col items-center justify-center p-8 scale-0 md:scale-50 lg:scale-50 xl:scale-75 2xl:scale-100'>
                            <div className='flex'>
                                <div className='logo-square-box'></div>
                                <div className='logo-square-box'></div>
                            </div>
                            <div className='flex'>
                                <div className='logo-square-box'></div>
                                <div className='logo-square-container'><svg
                                    className="stroke-primary-light hover:scale-105 translation ease-in-out duration-500"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    style={{ filter: 'drop-shadow(6px 6px 12px rgba(0, 0, 0, 0.25))' }}
                                >
                                    <line x1="5" y1="50" x2="95" y2="50" strokeWidth="6" strokeLinecap="round" />
                                    <line x1="50" y1="5" x2="50" y2="95" strokeWidth="6" strokeLinecap="round" />
                                </svg></div>
                            </div>
                    </div>

                    {/* Modal Right 2/3 section: For title and links */}
                    <div className='rounded-r-xl w-2/3 flex flex-col items-center p-8 bg-gradient-radial from-primary-light to-primary relative overflow-hidden'>
                        {/* Circles */}
                        <div className='absolute bottom-[11rem] left-[14rem] w-[8rem] h-[8rem] border-8 rounded-full border-white/10'></div>
                        <div className='absolute -bottom-[30rem] -left-32 w-[40rem] h-[40rem] border-8 rounded-full border-white/10'></div>
                        <div className='absolute -top-24 -left-32 w-[28rem] h-[28rem] border-8 rounded-full border-white/10'></div>
                        <div className='absolute bottom-24 -right-4 w-[30rem] h-[30rem] border-8 rounded-full border-white/10'></div>
                        <div className='absolute -top-12 -right-12 w-[8rem] h-[8rem] border-8 rounded-full border-white/10'></div>

                        {/* Title */}
                        <h1 className='text-[2rem] lg:text-[2.8rem] 2xl:text-[4.5rem] xl:text-[3.5rem] font-bold uppercase tracking-tight mb-6 text-more-light/95 '
                            style={{ filter: 'drop-shadow(6px 6px 12px rgba(0, 0, 0, 0.25))' }}
                        >
                            <span className='text-[2.5rem] lg:text-[3.5rem] xl:text-[4.4rem] 2xl:text-[5.4rem]'>C</span>ourses <span className='text-[2.5rem] lg:text-[3.5rem] xl:text-[4.4rem] 2xl:text-[5.4rem]'>T</span>ools
                        </h1>

                        {/* Navigation Links */}
                        <nav className='space-y-4 xl:flex xl:space-x-4 xl:items-end mt-[5%] mt-[20%] z-10'>
                            <Link className='landing-nav-button w-40 h-10' href='/herramientas/cursos'>
                                <h2 className='landing-nav-text'>Ver Cursos</h2>
                            </Link>

                            <Link className='landing-nav-button w-40 h-10' href='/herramientas/tesis'>
                                <h2 className='landing-nav-text'>Ver Tesis</h2>
                            </Link>

                            <Link className='landing-nav-button w-40 h-10' href='/herramientas/reportes/tesis'>
                                <h2 className='landing-nav-text'>Reportes</h2>
                            </Link>
                        </nav>
                        <Link className='landing-nav-button w-40 h-10 mt-auto mb-8 2xl:mb-20 z-10' href='/login'>
                            <h2 className='landing-nav-text'>
                                Iniciar Sesion
                            </h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
