import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#00112D] shadow-black shadow-sm fixed h-14 flex items-center justify-center w-full top-0 z-10">
      {/* Menu Desktop */}
      <nav className='hidden md:flex items-center justify-between w-full h-14 px-6'>
        <span className='text-white font-bold text-xl'>CineExplorer</span>
        <ul className='flex gap-6'>
          <li><a href="#" className='text-white hover:text-gray-300'>Filmes</a></li>
          <li><a href="#" className='text-white hover:text-gray-300'>Séries</a></li>
          <li><a href="#" className='text-white hover:text-gray-300'>Documentários</a></li>
        </ul>
      </nav>

      {/* Menu Mobile */}
      <nav className='flex md:hidden items-center justify-between w-full h-14 px-6'>
        <span className='text-white font-bold text-xl'>Logo</span>
        <button 
          onClick={handleMenu} 
          className='text-white focus:outline-none'
        >
          {menuOpen ? 'Fechar' : 'Abrir'}
        </button>
      </nav>

      {/* Dropdown Menu Mobile */}
      {menuOpen && (
        <div className='absolute top-14 right-0 w-[50%] h-screen bg-yellow-50'>
          <ul className='flex flex-col gap-4 p-4'>
            <li><a href="#" className='hover:text-gray-600'>Filmes</a></li>
            <li><a href="#" className='hover:text-gray-600'>Séries</a></li>
            <li><a href="#" className='hover:text-gray-600'>Documentários</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
