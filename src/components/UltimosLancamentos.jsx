import React, { useEffect, useState } from 'react';
import { obterLançamentosRecentes } from '../servicos API/Api';
import { useFormatacao } from '../contexts/FormatacoesContext';
import { useSwipeable } from 'react-swipeable';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w400';

const UltimosLancamentos = () => {
    const [ultimosLancamentos, setUltimosLancamentos] = useState([]);
    const [index, setIndex] = useState(0);

    const { formatacaoData, handleFilmeClick } = useFormatacao();

    const listarUltimosLancamentos = async () => {
        try {
            const dados = await obterLançamentosRecentes();
            setUltimosLancamentos(dados.results);
        } catch (error) {
            console.error('Erro ao obter lançamentos:', error);
        }
    };

    useEffect(() => {
        listarUltimosLancamentos();
        const intervalo = setInterval(() => {
            setIndex((prev) => (prev + 1) % ultimosLancamentos.length);
        }, 6000);

        return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar o componente
    }, [ultimosLancamentos]);

    const exibirProximo = () => {
        setIndex((prev) => (prev < ultimosLancamentos.length - 1 ? prev + 1 : 0));
    };

    const exibirAnterior = () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : ultimosLancamentos.length - 1));
    };

    const handlers = useSwipeable({
        onSwipedLeft: exibirProximo,
        onSwipedRight: exibirAnterior,
        preventDefaultTouchmoveEvent: true,  // Previne o comportamento padrão de movimentação
        trackMouse: true  // Permite rastreamento com o mouse, testes em desktop
    });

    return (
        <section className='bg-[#092A5B] sm:min-h-[740px] md:min-h-[400px] flex items-center relative py-4 text-white'>
            <button
                className='text-8xl absolute left-2 top-1/2 -translate-y-1/2 hidden md:block'
                onClick={exibirAnterior}
            >
                &lt;
            </button>
            <div className='mx-4 md:mx-28 relative'>
                {ultimosLancamentos.length > 0 && (
                    <div {...handlers} className='relative'>
                        {/* Botão de navegação anterior */}

                        {/* Renderiza o filme atual baseado no índice */}
                        {ultimosLancamentos[index] && (
                            <div key={ultimosLancamentos[index].id} className='flex flex-col items-center md:flex-row gap-4 cursor-pointer' onClick={()=> handleFilmeClick(ultimosLancamentos[index].id)}>
                                <div className='flex-shrink-0 flex justify-center items-center'>
                                    {ultimosLancamentos[index].poster_path ? (
                                        <img
                                            src={`${BASE_IMAGE_URL}${ultimosLancamentos[index].poster_path}`}
                                            alt={ultimosLancamentos[index].title}
                                            className=' h-[340px] w-[250px]  object-cover'
                                        />
                                    ) : (
                                        <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                                            <span>Imagem não disponível</span>
                                        </div>
                                    )}
                                </div>

                                <div className='flex flex-col text-center md:text-left gap-6'>
                                    <div>
                                        <h3 className='text-2xl font-semibold'>{ultimosLancamentos[index].title}</h3>
                                        <p className='text-sm font-semibold'>Lançamento: {formatacaoData(ultimosLancamentos[index].release_date)}</p>

                                    </div>

                                    <div>
                                        <p className='text-sm text-center md:text-left'>{ultimosLancamentos[index].overview || "Descrição não disponível."}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Botão de navegação próximo */}
                    </div>
                )}
            </div>
            <button
                className='text-8xl absolute right-2 top-1/2 -translate-y-1/2 hidden md:block'
                onClick={exibirProximo}
            >
                &gt;
            </button>
        </section>
    );
};

export default UltimosLancamentos;
