import React, { useContext } from 'react';
import Table from './components/Table';
import FilterInput from './components/FilterInput';
import { FilterContext } from './context/FilterContext';
import Sort from './components/Sort';

function App(): React.ReactElement {
  const { planets } = useContext(FilterContext);

  if (!planets.length) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <FilterInput />
      <Sort />
      <Table />
    </>
  );
}

export default App;
