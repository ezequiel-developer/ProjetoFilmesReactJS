import React, { useState } from 'react';
import { buscarFilmesPorNome } from '../servicos API/Api';
import { useNavigate } from 'react-router-dom';

const Headline = () => {
    const isMobile = window.innerWidth <= 768; // Verifica se a tela é menor ou igual a 768px

    const sectionStyle = {
        backgroundImage: 'url(./movie-background-collage.jpg)', // Caminho para a imagem na pasta public
        backgroundPosition: isMobile ? 'left bottom' : 'center center',
        backgroundSize: 'cover', // Ajusta o tamanho da imagem para cobrir o container
        backgroundRepeat: 'no-repeat', // Evita que a imagem se repita
        height: '90vh', // Define uma altura para o container
        width: '100%', // Define a largura para o container
    };

    const [nomeFilme, setNomeFilme] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState([]);
    const navigate = useNavigate();

    const handleBuscar = async () => {
        try {
            const dados = await buscarFilmesPorNome(nomeFilme);
            navigate('/ProjetoFilmesReactJS/resultadosBusca/', { state: { resultadosBusca: dados.results } });
        } catch (error) {
            console.log('Erro:', error);
        }
    };

    return (
        <section
            style={sectionStyle}
            className='text-white flex justify-center items-center flex-col px-4 md:px-8 lg:px-16'
        >
            <div className='text-center max-w-4xl w-full'>
                <h2 className='text-3xl font-bold uppercase'>Mergulhe no Mundo dos Filmes e Séries</h2>
                <p className='mb-4'>Descubra filmes, séries e trailers com informações detalhadas.</p>

                <div className='flex  md:flex-row gap-4 justify-center'>
                    <input
                        type="text"
                        className='w-full md:w-72 rounded-xl p-2 text-xl text-black'
                        value={nomeFilme}
                        placeholder='Digite o nome do filme ou série'
                        onChange={(e) => setNomeFilme(e.target.value)}
                    />
                    <button
                        onClick={handleBuscar}
                        className='bg-white text-black rounded-xl px-5 py-2 font-semibold transition-colors duration-200 hover:bg-[#060e1b] hover:text-white'
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Headline;
