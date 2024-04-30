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
  const [order] = useState({ column: 'name', sort: 'ASC' as 'ASC' | 'DESC' });

  const columns = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

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
      value={ {
        filter,
        setFilter,
        planets,
        filteredPlanets,
        setFilteredPlanets,
        order,
        setPlanets,
        columns } }
    >
      {' '}
      {children}
    </FilterContext.Provider>
  );
}
