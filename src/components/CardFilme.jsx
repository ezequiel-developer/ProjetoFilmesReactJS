// src/components/CardFilme.jsx
import React from 'react';
import { useFormatacao } from '../contexts/FormatacoesContext';

const CardFilme = ({ filme, onClick }) => {
    const { BASE_IMAGE_URL, formatacaoData } = useFormatacao();

    return (
        <div className='shadow-sm rounded-sm hover:scale-105 transition-transform duration-300 cursor-pointer shadow-black relative' onClick={() => onClick(filme.id)}>
            <img
                src={`${BASE_IMAGE_URL}${filme.poster_path}`}
                alt={filme.title}
                className='w-full h-auto object-cover'
            />
            <div className='p-2 absolute inset-x-0 bottom-0 text-white bg-black bg-opacity-75'>
                <p className='text-[10px] text-center'>Lançamento: {formatacaoData(filme.release_date)}</p>
            </div>
        </div>
    );
};

export default CardFilme;
