
import React from 'react';

const GavelIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.63 3.34L4.08 10.89l2.83 2.83 7.55-7.55-2.83-2.83zM3 21h18v-2H3v2zm3.41-8.17l-1.42 1.41 8.49 8.49 1.41-1.42-8.48-8.48z"/>
        <path d="M12.34 2.63l-1.41 1.41 7.55 7.55 1.41-1.41-7.55-7.55zm-8.26.71l-1.42 1.41 2.83 2.83 1.41-1.42-2.82-2.82z"/>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <GavelIcon className="h-7 w-7 text-sky-400" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
              Indian Law Navigator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
