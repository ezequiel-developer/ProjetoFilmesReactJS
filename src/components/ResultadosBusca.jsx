import React from 'react';
import { useLocation } from 'react-router-dom';
import CardFilme from './CardFilme';
import { useFormatacao } from '../contexts/FormatacoesContext';

const ResultadosBusca = () => {
    const location = useLocation();
    const resultados = location.state?.resultadosBusca || [];
    const { handleFilmeClick } = useFormatacao(); // Importa a função de clique do contexto

    return (
        <section>
            <h2 className='text-center text-2xl font-bold my-8'>Resultados</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-4 md:mx-8'>
                {resultados.length > 0 ? (
                    resultados.map((item) => (
                        <CardFilme
                            key={item.id}
                            filme={item}
                            onClick={handleFilmeClick} // Passa a função de clique para o CardFilme
                        />
                    ))
                ) : (
                    <p className='text-center text-white'>Nenhum resultado encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default ResultadosBusca;
