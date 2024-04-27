import React, { useState, useEffect, ReactNode } from 'react';
import { FilterContext } from '../context/FilterContext';
import { Planet } from '../types';
import fetchPlanets from '../utils/fetchPlanets';

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState('');
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]); // Adicione esta linha

  useEffect(() => {
    (async () => {
      const data = await fetchPlanets();
      setPlanets(data.results.map((planet: Planet) => {
        const { residents, ...rest } = planet;
        return rest;
      }));
    })();
  }, []);

  return (
    <FilterContext.Provider
      value={ { filter,
        setFilter,
        planets,
        filteredPlanets,
        setFilteredPlanets } }
    >
      {' '}
      {children}
    </FilterContext.Provider>
  );
}
