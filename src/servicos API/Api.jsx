const API_KEY = '968ebe9e6464c39e6dec64da6fee2af6'; 
const BASE_URL = 'https://api.themoviedb.org/3';

// Função para fazer uma requisição GET à API do TMDb
const buscarDaApi = async (endpoint, params = {}) => {
  // Adiciona o parâmetro de idioma para obter dados em português
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.search = new URLSearchParams({ ...params, api_key: API_KEY, language: 'pt-BR' });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Resposta da rede não foi ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Função para obter as tendências diárias
export const obterTendenciasDiarias = () => {
  return buscarDaApi('/trending/movie/day');
};

// Função para obter as tendências semanais
export const obterTendenciasSemana = () => {
  return buscarDaApi('/trending/movie/week');
};

// Função para obter lançamentos recentes
export const obterLançamentosRecentes = () => {
  return buscarDaApi('/movie/now_playing');
};

// Função para listar todos os gêneros
export const obterGeneros = () => {
  return buscarDaApi('/genre/movie/list');
};

export const obterFilmesPorGenero = (generoId) => {
  return buscarDaApi('/discover/movie', { with_genres: generoId });
};

export const obterFilmePorId = (id) => {
  return buscarDaApi(`/movie/${id}`);
};

// src/servicos API/Api.js

// Função para obter vídeos do filme
export const obterVideosPorId = async (id) => {
  return buscarDaApi(`/movie/${id}/videos`);
};

export const obterElencoPorId = async (id) => {
  return buscarDaApi(`/movie/${id}/credits`);
};


// Função para buscar filmes por nome
export const buscarFilmesPorNome = (nome) => {
  return buscarDaApi('/search/movie', { query: nome });
};
