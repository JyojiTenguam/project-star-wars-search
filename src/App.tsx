import React, { useState, useEffect } from 'react';
import FetchData from './tests/fetch/fetchData';
import Table from './tests/components/Table';
import { Planet } from './types';
import { FilterContext } from './context/FilterContext';
import FilterInput from './components/FilterInput';

function App(): React.ReactElement {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://starwars-api-backup.vercel.app/planets');
        const data = await response.json();
        setPlanets(data.results.map((planet: Planet) => {
          const { residents, ...rest } = planet;
          return rest;
        }));
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <FilterContext.Provider value={ { filter, setFilter } }>
      <FilterInput />
      <Table planets={ planets } />
    </FilterContext.Provider>
  );
}

export default App;
