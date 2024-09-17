import React, { useState } from 'react';
import { buscarFilmesPorNome } from '../servicos API/Api';
import { useNavigate } from 'react-router-dom';

const Headline = () => {
    const sectionStyle = {
        backgroundImage: 'url(/movie-background-collage.jpg)', // Caminho para a imagem na pasta public
        backgroundSize: 'cover',  // Faz a imagem cobrir toda a área da section
        backgroundPosition: 'center', // Centraliza a imagem
        height: '60vh', // Define a altura da section (opcional, ajuste conforme necessário)
    };

    const [nomeFilme, setNomeFilme] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState([]);
    const navigate = useNavigate();

    const handleBuscar = async () => {
        try {
            const dados = await buscarFilmesPorNome(nomeFilme);
            navigate('/resultadosBusca', { state: { resultadosBusca: dados.results } });
        } catch (error) {
            console.log('Erro:', error);
        }
    };
    
    return (
        <section
            style={sectionStyle}
            className='text-white flex justify-center items-center flex-col'
        >
            <div className='text-center'>
                <h2 className='text-2xl font-bold uppercase'>Lorem ipsum dolor sit amet..</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, iste!</p>
            </div>

            <div className='flex gap-4 mt-4'>
                <input
                    type="text"
                    className='w-72 rounded-xl p-1 text-xl text-black'
                    value={nomeFilme}
                    onChange={(e) => setNomeFilme(e.target.value)}
                />
                <button
                    onClick={handleBuscar}
                    className='bg-white text-black rounded-xl px-5 font-semibold'
                >
                    Buscar
                </button>
            </div>
        </section>
    );
};

export default Headline;
