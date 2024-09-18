import React, { useState } from 'react';
import MenuFiltros from '../components/MenuFiltros';
import CardFilme from '../components/CardFilme';
import { useFormatacao } from '../contexts/FormatacoesContext';

const PageFilmes = () => {
    const [filmes, setFilmes] = useState([]);
    const { handleFilmeClick } = useFormatacao();

    return (
        <div className='mt-[56px] flex flex-col md:grid md:grid-cols-12 gap-4 mx-4 py-10'>
            <nav className='w-full md:col-span-3 border-2'>
                <h2 className='text-center text-2xl font-bold mt-2'>Filmes</h2>

                <MenuFiltros setConteudo={setFilmes} tipoConteudo="filmes" />
            </nav>

            <div className='md:col-span-9 border-2 grid-cols-2 grid md:grid-cols-5 gap-4'>
                {filmes.map((el) => (
                    <CardFilme key={el.id} filme={el} onClick={handleFilmeClick} />
                ))}
            </div>
        </div>
    );
};

export default PageFilmes;
