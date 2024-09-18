import React, { useEffect, useState } from 'react';
import { obterGeneros, obterFilmesOrdenados, obterSeriesOrdenadas } from '../servicos API/Api';

const MenuFiltros = ({ setConteudo, tipoConteudo }) => {
    const [parametroOrdenacao, setParametroOrdenacao] = useState('popularity.desc');
    const [parametroGenero, setParametroGenero] = useState('');
    const [listaGeneros, setListaGenero] = useState([]);

    const buscarGeneros = async () => {
        try {
            const dados = await obterGeneros();
            setListaGenero(dados.genres);
        } catch (error) {
            console.error('Erro ao buscar gêneros:', error);
        }
    };

    const buscarConteudoFiltrado = async () => {
        try {
            let dados;
            if (tipoConteudo === 'filmes') {
                dados = await obterFilmesOrdenados(parametroOrdenacao, parametroGenero);
            } else if (tipoConteudo === 'series') {
                dados = await obterSeriesOrdenadas(parametroOrdenacao, parametroGenero);
            }
            setConteudo(dados.results);
        } catch (error) {
            console.error('Erro ao buscar conteúdo filtrado:', error);
        }
    };

    useEffect(() => {
        buscarGeneros();
    }, []); // Chama apenas uma vez quando o componente é montado

    useEffect(() => {
        buscarConteudoFiltrado();
    }, [parametroOrdenacao, parametroGenero]); // Chama quando qualquer um dos parâmetros muda

    return (
        <form className="p-4 space-y-4">
            <div>
                <label htmlFor="ordenacao" className="block text-sm font-medium text-gray-700">
                    Ordenação
                </label>
                <select
                    id="ordenacao"
                    value={parametroOrdenacao}
                    onChange={(e) => setParametroOrdenacao(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="popularity.desc">Popularidade (descendente)</option>
                    <option value="popularity.asc">Popularidade (ascendente)</option>
                    <option value="release_date.desc">Data de lançamento (descendente)</option>
                    <option value="release_date.asc">Data de lançamento (ascendente)</option>
                </select>
            </div>

            <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                    Gênero
                </label>
                <select
                    id="genero"
                    value={parametroGenero}
                    onChange={(e) => setParametroGenero(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Todos</option>
                    {listaGeneros.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
};

export default MenuFiltros;
