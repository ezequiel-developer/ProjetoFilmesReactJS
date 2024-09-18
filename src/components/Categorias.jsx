import React, { useEffect, useState } from 'react';
import { obterGeneros, obterFilmesPorGenero } from '../servicos API/Api';
import { useFormatacao } from '../contexts/FormatacoesContext';
import CardFilme from './CardFilme';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [filmesCategoriaSelecionada, setFilmesCategoriaSelecionada] = useState([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState(null);
    const { BASE_IMAGE_URL, formatacaoData, handleFilmeClick } = useFormatacao();

    const listarCategorias = async () => {
        try {
            const dados = await obterGeneros();
            setCategorias(dados.genres);
            console.log('Categorias =', dados);
        } catch (error) {
            console.error('Erro ao obter categorias', error);
        }
    };

    useEffect(() => {
        listarCategorias();
        listarFilmesPorCategoria(28); // Inicialmente carregar filmes da categoria com ID 28 
        setCategoriaAtiva(28);
    }, []);

    const listarFilmesPorCategoria = async (id) => {
        try {
            const dados = await obterFilmesPorGenero(id);
            setFilmesCategoriaSelecionada(dados.results);
            console.log('Filmes da categoria selecionada', dados);
        } catch (error) {
            console.error('Erro ao obter filmes da categoria', error);
        }
    };

    const handleCategoria = (id) => {
        listarFilmesPorCategoria(id);
        setCategoriaAtiva(id);
        console.log('Categoria clicada:', id);
    };

    return (
        <section>
            <h2 className='text-center text-2xl uppercase font-bold my-8'>Categorias</h2>

            <div className='flex text-white gap-4 my-8 flex-nowrap md:flex-wrap md:justify-center overflow-x-auto mx-4 whitespace-nowrap'>
                {categorias.map((item) => (
                    <ul key={item.id} className='list-none'>
                        <li
                            className={` px-4 py-1 ${categoriaAtiva === item.id ? 'bg-[#060e1b]' : 'bg-[#12336A]'}`}
                        >
                            <button onClick={() => handleCategoria(item.id)}>
                                {item.name}
                            </button>
                        </li>
                    </ul>
                ))}
            </div>


            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-2 md:mx-8'>
                {filmesCategoriaSelecionada.length > 0 ? (
                    filmesCategoriaSelecionada.map((item) => (
                        <CardFilme
                            key={item.id}
                            filme={item}
                            onClick={handleFilmeClick}
                        />
                    ))
                ) : (
                    <p className='text-center text-white'>Selecione uma categoria para ver os filmes.</p>
                )}
            </div>
        </section>
    );
};

export default Categorias;
