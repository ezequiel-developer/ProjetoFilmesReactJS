import React, { useEffect, useState } from 'react';
import { obterLançamentosRecentes } from '../servicos API/Api';
import { useFormatacao } from '../contexts/FormatacoesContext';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w400';

const UltimosLancamentos = () => {
    const [ultimosLancamentos, setUltimosLancamentos] = useState([]);
    const [index, setIndex] = useState(0);

    const { formatacaoData } = useFormatacao();

    const listarUltimosLancamentos = async () => {
        try {
            const dados = await obterLançamentosRecentes();
            setUltimosLancamentos(dados.results);
            console.log('Ultimos lancamentos:', dados);
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
    }, [ultimosLancamentos.length]);

    const exibirProximo = () => {
        setIndex((prev) => (prev < ultimosLancamentos.length - 1 ? prev + 1 : 0));
    };

    const exibirAnterior = () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : ultimosLancamentos.length - 1));
    };

    return (
        <section className='bg-[#092A5B] relative py-4 text-white'>
            <div className='mx-28'>
                {/* Verifica se a lista de lançamentos está carregada */}
                {ultimosLancamentos.length > 0 && (
                    <div>
                        <div>
                            <button className='text-8xl absolute left-6 top-1/2 -translate-y-[50%]' onClick={exibirAnterior}>
                                &lt;
                            </button>
                        </div>

                        {/* Renderiza o filme atual baseado no índice */}
                        {ultimosLancamentos[index] && (
                            <div key={ultimosLancamentos[index].id} className='flex flex-col md:flex-row items-center gap-8'>
                                <div className='flex-shrink-0'>
                                    {ultimosLancamentos[index].poster_path ? (
                                        <img
                                            src={`${BASE_IMAGE_URL}${ultimosLancamentos[index].poster_path}`}
                                            alt={ultimosLancamentos[index].title}
                                            className='w-full h-[400px] object-cover'
                                        />
                                    ) : (
                                        <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                                            <span>Imagem não disponível</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className='text-4xl font-semibold'>{ultimosLancamentos[index].title}</h3>
                                    <p className='text-lg'>{ultimosLancamentos[index].overview || "Descrição não disponível."}</p>
                                    <p className='font-bold'>
                                        Lançamento: {formatacaoData(ultimosLancamentos[index].release_date)}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div>
                            <button className='text-8xl absolute right-6 top-1/2 -translate-y-[50%]' onClick={exibirProximo}>
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UltimosLancamentos;
