import React, { useContext, useEffect, useRef, useState } from 'react';
import { obterTendenciasDiarias, obterTendenciasSemana } from '../servicos API/Api';
import { useFormatacao } from '../contexts/FormatacoesContext';
import CardFilme from './CardFilme';

// URL base para imagens TMDb
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

const TendenciasFilmes = () => {
    const [tendenciasDiarias, setTendenciasDiarias] = useState([]);
    const [tendenciasSemana, setTendenciasSemana] = useState([]);
    const [exibirDiaria, setExibirDiaria] = useState(false);
    const [exibirSemana, setExibirSemana] = useState(false);
    const { handleFilmeClick } = useFormatacao()


    const handleDiaria = async () => {
        try {
            const dados = await obterTendenciasDiarias();
            console.log(dados)
            setTendenciasDiarias(dados.results);
            setExibirDiaria(true);
            setExibirSemana(false);

        } catch (error) {
            console.error('Erro ao buscar tendências diárias:', error);
        }
    };

    const handleSemana = async () => {
        try {
            const dados = await obterTendenciasSemana();
            setTendenciasSemana(dados.results);
            setExibirSemana(true);
            setExibirDiaria(false);


        } catch (error) {
            console.error('Erro ao buscar tendências da semana:', error);
        }
    };


    useEffect(() => {
        handleDiaria()
    }, [])

    const carroselRef = useRef(null)

    const scrollEsquerdo = () => {
        carroselRef.current.scrollBy({
            left: -carroselRef.current.clientWidth,
            behavior: 'smooth'
        })
    }
    const scrollDireito = () => {
        carroselRef.current.scrollBy({
            left: carroselRef.current.clientWidth,
            behavior: 'smooth'
        })
    }


    return (
        <section className='m-4'>
            <div className='flex gap-4 mb-4'>
                <button
                    className={`text-white px-4 py-2 ${exibirDiaria ? 'bg-[#060e1b]' : 'bg-[#12336A]'}`}
                    onClick={handleDiaria}
                >
                    Dia
                </button>

                <button
                    className={`text-white px-4 py-2 ${exibirSemana ? 'bg-[#060e1b]' : 'bg-[#12336A]'}`}
                    onClick={handleSemana}
                >
                    Semana
                </button>
            </div>

            <div className='relative'>

                <div>
                    <button
                        onClick={scrollEsquerdo}
                        className='hidden md:block bg-black text-white px-1 py-3  text-4xl  absolute left-0 top-1/2 -translate-y-[50%] z-10'

                    >&lt;</button>


                    <button
                        onClick={scrollDireito}
                        className='hidden md:block bg-black text-white px-1 py-3  text-4xl  absolute right-0 top-1/2 -translate-y-[50%] z-10'


                    >&gt;</button>
                </div>

                {exibirDiaria && (
                    <div className='relative py-4  overflow-x-auto ' ref={carroselRef}>


                        <div className='flex gap-2'>
                            {tendenciasDiarias.map((item) => (
                                <div key={item.id} className='flex-none  relative w-48 '>
                                    <CardFilme
                                        key={item.id}
                                        filme={item}
                                        onClick={handleFilmeClick}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>
                )}

                {exibirSemana && (
                    <div className='relative overflow-x-auto' ref={carroselRef}>
                        <div className='flex gap-2'>
                            {tendenciasSemana.map((item) => (
                                <div key={item.id} className='flex-none w-48'>
                                    <CardFilme
                                        key={item.id}
                                        filme={item}
                                        onClick={handleFilmeClick}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section >
    );
};

export default TendenciasFilmes;
