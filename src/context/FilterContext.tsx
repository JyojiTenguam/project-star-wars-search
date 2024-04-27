import React, { createContext } from 'react';
import { Planet } from '../types';

interface FilterContextData {
  filter: string;
  // Adicione o tipo da função setFilter,setFilter é uma função que recebe um string ou uma função que recebe um string e retorna um string, e não retorna nada.
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  planets: Planet[];
  filteredPlanets: Planet[];
  setFilteredPlanets: React.Dispatch<React.SetStateAction<Planet[]>>;
}

export const FilterContext = createContext({} as FilterContextData);
