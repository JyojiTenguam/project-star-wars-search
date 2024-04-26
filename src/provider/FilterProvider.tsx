import React, { useState, ReactNode } from 'react';
import { FilterContext } from '../context/FilterContext';

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useState('');

  return (
    <FilterContext.Provider value={ { filter, setFilter } }>
      {children}
    </FilterContext.Provider>
  );
}
