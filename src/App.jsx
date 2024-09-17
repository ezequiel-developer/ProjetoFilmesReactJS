import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Headline from './components/Headline';
import TendenciasFIlmes from './components/TendenciasFIlmes';
import UltimosLancamentos from './components/UltimosLancamentos';
import Categorias from './components/Categorias';
import Detalhes from './components/Detalhes';
import { FormatacoesProvider } from './contexts/FormatacoesContext';
import ModalTrailer from './components/ModalTrailer';
import ResultadosBusca from './components/ResultadosBusca';

function App() {
  return (
    <Router>
      <FormatacoesProvider>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Headline />
              <TendenciasFIlmes />
              <UltimosLancamentos />
              <Categorias />
            </>
          } />
          <Route path="/resultadosBusca" element={
            <>
              <Headline />
              <ResultadosBusca />
            </>
          } />
          <Route path="/detalhes/:id" element={<Detalhes />} />
        </Routes>
      </FormatacoesProvider>
    </Router>
  );
}

export default App;
