import React, { Dispatch, SetStateAction } from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterInput from '../components/FilterInput';
import { FilterContext } from '../context/FilterContext';
import { Planet } from '../types';

describe('FilterInput', () => {
  let setFilterCalledWith: string | null = null;
  const setFilter = (value: string) => { setFilterCalledWith = value; };
  let setFilteredPlanetsCalledWith: any[] | null = null;
  const setFilteredPlanets = (value: any[]) => { setFilteredPlanetsCalledWith = value; };
  interface FilterContextData {
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    setFilteredPlanets: React.Dispatch<React.SetStateAction<Planet[]>>;
    setActiveFilters: () => void;
    order: string;
    setPlanets: () => void;
    columns: string[];
  }

  const setActiveFilters = () => {};

  const renderComponent = () =>
    render(
      <FilterContext.Provider value={{ 
        setFilter: setFilter as React.Dispatch<React.SetStateAction<string>>, 
        setFilteredPlanets: setFilteredPlanets as React.Dispatch<React.SetStateAction<Planet[]>>,
        filter: '',
        planets: [],
        filteredPlanets: [],
        order: { column: '', sort: 'ASC' }, // Adicione a propriedade order
        setPlanets: () => {},
        columns: []
      }}>
        <FilterInput />
      </FilterContext.Provider>
    );

  it('should handle input change', () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('name-filter');
    fireEvent.change(input, { target: { value: 'Terra' } });
    expect(setFilterCalledWith).toBe('Terra');
  });

  it('should handle clear filter', () => {
    const { getByText } = renderComponent();
    const button = getByText('Limpar filtro');
    fireEvent.click(button);
    expect(setFilterCalledWith).toBe('');
    expect(setFilteredPlanetsCalledWith).toEqual([]);
  });
  
  it('handleRemoveFilter removes the correct filter when called', () => {

    const filter: string = '';
    const planets: any[] = [];
    const filteredPlanets: any[] = [];
    const setFilter: Dispatch<SetStateAction<string>> = () => {};
    const setFilteredPlanets: Dispatch<SetStateAction<any[]>> = () => {};

    const { getByTestId, queryByTestId } = render(
      <FilterContext.Provider value={{ 
        filter, 
        setFilter, 
        planets, 
        setFilteredPlanets, 
        filteredPlanets,
        order: { column: '', sort: 'ASC' }, // Adicione a propriedade order
        setPlanets: () => {},
        columns: []
      }}>
        <FilterInput />
      </FilterContext.Provider>
    );

    // Simula a adição de um filtro
    fireEvent.click(getByTestId('button-filter'));
  
    // Verifica se o filtro foi adicionado
    expect(getByTestId('clear-filter-button')).toBeInTheDocument();
  
    // Simula a remoção do filtro
    fireEvent.click(getByTestId('clear-filter-button'));
  
    // Verifica se o filtro foi removido
    expect(queryByTestId('clear-filter-button')).toBeNull();
  });
});