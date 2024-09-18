import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obterFilmePorId, obterVideosPorId, obterElencoPorId } from '../servicos API/Api'; // Ajuste o caminho da importação conforme necessário
import { useFormatacao } from '../contexts/FormatacoesContext';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalTrailer from './ModalTrailer';
import ModalElenco from './ModalElenco';

const Detalhes = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [trailer, setTrailer] = useState(''); // Chave do trailer
    const [elencoPrincipal, setElencoPrincipal] = useState([]);
    const [todosAtores, setTodosAtores] = useState([]);
    const [todosProducao, setTodosProducao] = useState([]);
    const [mostrarModalTrailer, setMostrarModalTrailer] = useState(false);
    const [mostrarModalElenco, setMostrarModalElenco] = useState(false);

    const { BASE_IMAGE_URL, formatacaoData, formatarMoeda } = useFormatacao();

    useEffect(() => {
        const carregarDetalhes = async () => {
            try {
                const dados = await obterFilmePorId(id);
                console.log('detalhes-filme', dados)
                setFilme(dados);
                const dadosTrailer = await obterVideosPorId(id);
                const dadosElenco = await obterElencoPorId(id);

                setElencoPrincipal(dadosElenco.cast.slice(0, 5));
                setTodosAtores(dadosElenco.cast);
                setTodosProducao(dadosElenco.crew);

                if (dadosTrailer.results.length > 0) {
                    setTrailer(dadosTrailer.results[0].key);
                }
            } catch (error) {
                console.error('Erro ao obter detalhes do filme', error);
            }
        };

        carregarDetalhes();
    }, [id]);

    if (!filme) return <p>Carregando...</p>;

    const listaGeneros = filme.genres.map(genero => genero.name).join(', ');

    // Formatação do orçamento
    const formatarOrcamento = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    };

    // Tradução do status
    const traduzirStatus = (status) => {
        switch (status) {
            case 'Released':
                return 'Lançado';
            case 'Post Production':
                return 'Pós-produção';
            case 'In Production':
                return 'Em Produção';
            default:
                return 'Desconhecido';
        }
    };

    return (
        <section className="relative bg-black h-screen text-white mt-[56px]">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`, opacity: 0.2 }}
            ></div>

            <div className="relative flex flex-col-reverse md:flex-row items-center justify-center space-x-8 px-4 w-full h-full">
                <div className="flex flex-col justify-center gap-20 md:gap-0">
                    <div>
                        <p className="sm:flex md:hidden">{filme.overview}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-[150px] h-[200px] md:w-[300px] flex-shrink-0 md:h-[400px]">
                            <img
                                className="object-cover w-full h-full"
                                src={`${BASE_IMAGE_URL}${filme.poster_path}`}
                                alt={filme.title}
                            />
                        </div>

                        <div className=''>
                            <h3 className="text-xl font-bold">{filme.title}</h3>
                            <ul className="list-disc mt-2 ml-3 text-sm md:text-[10px]">
                                <li>Gêneros: {listaGeneros}</li>
                                <li>Duração: {filme.runtime} minutos</li>
                                <li>Lançamento: {formatacaoData(filme.release_date)}</li>
                            </ul>

                            <button
                                className="text-xl font-semibold md:mb-10 transition-colors duration-300 hover:text-[#4987c2]"
                                onClick={() => setMostrarModalTrailer(true)} // Abre o modal
                            >
                                <FontAwesomeIcon icon={faPlay} className="mt-2" /> Ver Trailer
                            </button>

                            <p className="hidden md:flex">{filme.overview}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 mx-4 md:mx-8">
                <h2 className="text-2xl text-black font-bold mb-4">Elenco Principal</h2>
                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {elencoPrincipal.map((item) => (
                            <div key={item.id} className=" rounded-xl text-black shadow-gray-700 shadow-sm  flex flex-col items-center">
                                <img
                                    src={`${BASE_IMAGE_URL}${item.profile_path}`}
                                    alt=""
                                    className="w-full h-[300px] object-cover rounded-t-xl"
                                />
                                <div className="text-center p-2">
                                    <h4 className="font-bold">{item.name}</h4>
                                    <h5>{item.character}</h5>
                                </div>
                            </div>
                        ))}
                        <div className="absolute left-1/2 -translate-x-[50%] -bottom-14 border-b-2 border-black text-black hover hover:text-[#416094]">
                            <button className="text-xl font-bold uppercase " onClick={() => setMostrarModalElenco(true)}>
                                Ver mais
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-20 pb-20 mx-8">
                <h3 className="text-2xl font-bold mb-4 text-black">Informações Adicionais</h3>
                <ul className="text-black">
                    <li><strong>Status:</strong> {traduzirStatus(filme.status)}</li>
                    <li><strong>Idioma Original:</strong> {filme.original_language === "en" ? "Inglês" : filme.original_language}</li>
                    <li><strong>Orçamento:</strong> {formatarMoeda(filme.budget)}</li>
                </ul>
            </div>

            {/* Exibe o modal se mostrarModal for true */}
            {mostrarModalTrailer && <ModalTrailer trailer={trailer} onClose={() => setMostrarModalTrailer(false)} />}
            {mostrarModalElenco && <ModalElenco todosAtores={todosAtores} todosProducao={todosProducao} onClose={() => setMostrarModalElenco(false)} />}
        </section>
    );
};

export default Detalhes;
