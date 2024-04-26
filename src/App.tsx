import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import { Planet } from './types';
import { FilterProvider } from './provider/FilterProvider';
import FilterInput from './components/FilterInput';

function App(): React.ReactElement {
  const [planets, setPlanets] = useState<Planet[]>([]);

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
    <FilterProvider>
      <FilterInput />
      <Table planets={ planets } />
    </FilterProvider>
  );
}

export default App;
