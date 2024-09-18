import React, { useRef, useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa'; // Ícones de fechar (X) e menu (hambúrguer)
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref para o contêiner do menu dropdown

  // Função para lidar com cliques fora do menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Adiciona e remove o listener para cliques fora do menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#00112D] shadow-black shadow-sm fixed h-14 flex items-center justify-between w-full top-0 z-20 px-6">
      {/* Menu Desktop */}
      <nav className='hidden md:flex items-center w-full h-full'>
        <span className='text-white font-bold text-xl'><Link to="/ProjetoFilmesReactJS/" className='text-white hover:text-gray-300'>CineExplorer</Link></span>
        <ul className='flex gap-6 ml-auto'>
          <li><Link to="/ProjetoFilmesReactJS/" className='text-white hover:text-gray-300'>Home</Link></li>
          <li><Link to="/ProjetoFilmesReactJS/PageFilmes" className='text-white hover:text-gray-300'>Filmes</Link></li>
          <li><Link to="/ProjetoFilmesReactJS/PageSeries" className='text-white hover:text-gray-300'>Series</Link></li>
        </ul>
      </nav>

      {/* Menu Mobile */}
      <nav className='md:hidden flex items-center justify-between w-full h-full'>
        <span className='text-white font-bold text-xl'><Link to="/ProjetoFilmesReactJS/" className='text-white hover:text-gray-300'>CineExplorer</Link></span>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative cursor-pointer p-4"
        >
          <div className="transition-transform duration-300 ease-in-out">
            {menuOpen ? (
              <FaTimes className='text-2xl text-white' />
            ) : (
              <FaBars className='text-2xl text-white' />
            )}
          </div>
        </div>
      </nav>

      {/* Dropdown Menu Mobile */}
      {menuOpen && (
        <div ref={menuRef} className='absolute top-14 right-0 w-[50%] h-screen bg-[#12336A]'>
          <ul className='flex flex-col gap-4 text-center text-xl text-white w-full'>
            <li className='hover:bg-[#060E1B] transition-colors duration-300 py-4'><Link to='/ProjetoFilmesReactJS/'>Home</Link></li>
            <li className='hover:bg-[#060E1B] transition-colors duration-300 py-4'><Link to='/ProjetoFilmesReactJS/PageFilmes'>Filmes</Link></li>
            <li className='hover:bg-[#060E1B] transition-colors duration-300 py-4'><Link to='/ProjetoFilmesReactJS/PageSeries'>Séries</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
