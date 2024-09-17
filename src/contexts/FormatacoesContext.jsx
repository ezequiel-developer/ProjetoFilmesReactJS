// src/contexts/FormatacoesContext.js
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Cria o contexto
const FormatacoesContext = createContext();

// Cria o provider
export const FormatacoesProvider = ({ children }) => {
    const navigate = useNavigate();

    // Função de formatação de data
    const formatacaoData = (stringData) => {
        const data = new Date(stringData).toLocaleDateString('pt-BR');
        return data;
    };

    // URL base para imagens
    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

    // Função para navegação
    const goTo = (path) => {
        navigate(path);
    };

    // Função para lidar com o clique em filmes
    const handleFilmeClick = (id) => {
        goTo(`/ProjetoFilmesReactJS/detalhes/${id}`); // Usa a função goTo do contexto para redirecionar
    };

     // Formatação do orçamento
     const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    };

    return (
        <FormatacoesContext.Provider value={{ formatacaoData, BASE_IMAGE_URL, handleFilmeClick, formatarMoeda }}>
            {children}
        </FormatacoesContext.Provider>
    );
};

// Hook personalizado para usar o Contexto
export const useFormatacao = () => useContext(FormatacoesContext);
