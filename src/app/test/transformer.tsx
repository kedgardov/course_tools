'use client'
import { useState } from 'react';

const Transformer = ({}: {}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClose = () => {
    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  }

  return (
    <div className='relative overflow-hidden bg-gray-300'>
          {!isExpanded && (
          <button
            className={`shadow bg-gray-500/50 w-12 h-12 border rounded-r-full bg-gray-300 fixed top-1/2 left-0 transition-all ease-in-out duration-500 ${isExpanded? 'translate-x-80 opacity-0':''}`}
            onClick={()=>setIsExpanded(true)}
          >
            Toggle
          </button>
          )}
      <div className={`${isExpanded? 'w-80': 'w-0'} overflow-hidden transition-all ease-in-out duration-500`}>
      <div className={`bg-blue-400 min-h-screen w-80 h-full`}>
      <button onClick={() => handleClose()} className='p-1 bg-red-300/50'>
        X
      </button>
      </div>
      </div>
    </div>
  );
};

export default Transformer;
