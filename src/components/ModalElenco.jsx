import React, { useState } from 'react';
import { useFormatacao } from '../contexts/FormatacoesContext';

const ModalElenco = ({ todosAtores, todosProducao, onClose }) => {
    const { BASE_IMAGE_URL } = useFormatacao();
    const [mostrarElenco, setMostrarElenco] = useState(true);
    const [quantidadeExibida, setQuantidadeExibida] = useState(10); // Quantidade inicial de itens exibidos

    const carregarMais = () => {
        setQuantidadeExibida(quantidadeExibida + 10); // Carrega mais 10 itens
    };

    const obterImagemOuPadrao = (caminho) => {
        return caminho ? `${BASE_IMAGE_URL}${caminho}` : 'caminho/para/imagem/padrao.png';
    };

    return (
        <div className='bg-black flex fixed justify-center items-center z-10 bg-opacity-80 inset-0 h-screen w-full'>
            <div className='bg-black p-10 w-[80%] h-[70vh] relative overflow-hidden'>
                <div className='flex gap-2 mb-4'>
                    <button
                        className={`px-4 py-2 rounded ${mostrarElenco ? 'bg-[#12336A]' : 'bg-[#060e1b]'}`}
                        onClick={() => setMostrarElenco(true)}
                    >
                        Elenco
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${!mostrarElenco ? 'bg-[#12336A]' : 'bg-[#060e1b]'}`}
                        onClick={() => setMostrarElenco(false)}
                    >
                        Produção
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className='absolute text-red-500 top-4 right-4 text-2xl font-bold'
                >
                    X
                </button>

                <div className='overflow-y-auto h-[calc(100%-2.5rem)]'>
                    {mostrarElenco ? (
                        todosAtores.length > 0 ? (
                            todosAtores.map((item) => (
                                <div
                                    key={item.id}
                                    className='flex items-center gap-2 mb-2'
                                >
                                    <img
                                        src={`${BASE_IMAGE_URL}${item.profile_path}`}
                                        alt={item.name}
                                        className='h-16 rounded-xl'
                                    />
                                    <div className='flex flex-col'>
                                        <h3 className='text-white font-bold'>{item.name}</h3>
                                        <h4 className='text-[10px]'>{item.character}</h4>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-white'>Nenhum ator disponível.</p>
                        )
                    ) : (
                        todosProducao.length > 0 ? (
                            <>
                                {todosProducao.slice(0, quantidadeExibida).map((item) => (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-2 mb-2'
                                    >
                                        <img
                                            src={`${BASE_IMAGE_URL}${item.profile_path}`}
                                            alt={item.name}
                                            className='h-16 rounded-xl'
                                        />
                                        <div className='flex flex-col'>
                                            <h3 className='text-white font-bold'>{item.name}</h3>
                                            <h4 className='text-[10px]'>{item.job}</h4>
                                        </div>
                                    </div>
                                ))}

                                {/* Exibir o botão "Carregar mais" se ainda houver mais membros para mostrar */}
                                {quantidadeExibida < todosProducao.length && (
                                    <button
                                        onClick={carregarMais}
                                        className='mt-4 px-4 py-2 bg-[#12336A] rounded text-white font-bold'
                                    >
                                        Mostrar mais
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className='text-white'>Nenhum membro da produção disponível.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalElenco;
