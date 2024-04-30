import React, { ChangeEvent, useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';
import { FilterType } from '../types';

function FilterInput() {
  const { filter, setFilter, planets, setFilteredPlanets } = useContext(FilterContext);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const columns = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  useEffect(() => {
    const newSelectedColumns = activeFilters.map((f) => f.column);
    setSelectedColumns(newSelectedColumns);
  }, [activeFilters]);

  useEffect(() => {
    if (Array.isArray(planets)) {
      let filteredData = [...planets];
      if (filter) {
        filteredData = filteredData.filter((planet: any) => planet.name.includes(filter));
      }

      activeFilters.forEach((activeFilter) => {
        filteredData = filteredData.filter((planet: any) => {
          const planetValue = Number(planet[activeFilter.column as keyof typeof planet]);
          let comparisonResult = false;
          switch (activeFilter.comparison) {
            case 'maior que':
              comparisonResult = planetValue > Number(activeFilter.value);
              break;
            case 'menor que':
              comparisonResult = planetValue < Number(activeFilter.value);
              break;
            case 'igual a':
              comparisonResult = planetValue === Number(activeFilter.value);
              break;
            default:
              comparisonResult = true;
          }
          return comparisonResult;
        });
      });

      setFilteredPlanets(filteredData);
    } else {
      console.error('Planets is not an array');
    }
  }, [activeFilters, planets, filter, setFilteredPlanets]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterChange = (event:
  ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilterValues({
      ...filterValues,
      [event.target.name]: event.target.value,
    });
    console.log('filterValues após a atualização:', filterValues);
  };

  const handleClearFilter = () => {
    setFilter('');
    setFilterValues({
      column: '',
      comparison: '',
      value: '',
    });
    setFilteredPlanets([]);
  };

  const handleFilter = () => {
    if (!filterValues.column) {
      console.log('Filtro não aplicado');
      return;
    }

    const filteredData = planets.filter((planet: any) => {
      if (filterValues.column === 'name') {
        return planet.name.includes(filter);
      }

      const planetValue = Number(planet[filterValues.column as keyof typeof planet]);
      console.log('Valor do planeta para a coluna selecionada:', planetValue);
      let comparisonResult = false;
      switch (filterValues.comparison) {
        case 'maior que':
          comparisonResult = planetValue > Number(filterValues.value);
          console.log('Resultado da comparação "maior que":', comparisonResult);
          break;
        case 'menor que':
          comparisonResult = planetValue < Number(filterValues.value);
          console.log('Resultado da comparação "menor que":', comparisonResult);
          break;
        case 'igual a':
          comparisonResult = planetValue === Number(filterValues.value);
          console.log('Resultado da comparação "igual a":', comparisonResult);
          break;
        default:
          comparisonResult = true;
      }
      return comparisonResult;
    });
    console.log('Dados filtrados no final da função handleFilter:', filteredData);
    setFilteredPlanets(filteredData);
    setActiveFilters([...activeFilters, filterValues]);
    setSelectedColumns((prevSelectedColumns) => [...prevSelectedColumns,
      filterValues.column]);
    setFilterValues({
      column: selectedColumns.includes('population')
        ? 'orbital_period' : 'population',
      comparison: 'maior que',
      value: '0',
    });
  };

  const handleRemoveFilter = (index: number) => {
    const newActiveFilters = [...activeFilters];
    const removeFilter = newActiveFilters.splice(index, 1);
    setActiveFilters(newActiveFilters);
    setSelectedColumns(selectedColumns.filter((column) => column
    !== removeFilter[0].column));
  };

  const handleRemoveAllFilters = () => {
    setActiveFilters([]);
    setSelectedColumns([]);
    setFilteredPlanets([]);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filter by name..."
        value={ filter }
        onChange={ handleInputChange }
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ filterValues.column }
        onChange={ handleFilterChange }
      >
        {columns.map((column) => (selectedColumns
          .includes(column) ? null
          : <option key={ column } value={ column }>{column}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ filterValues.comparison }
        onChange={ handleFilterChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ filterValues.value }
        onChange={ handleFilterChange }
      />
      <button onClick={ handleClearFilter }>Limpar filtro</button>
      <button
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
      {activeFilters.map((activeFilter, index) => (
        <div data-testid="filter" key={ index }>
          <span>
            {activeFilter.column}
            {' '}
            {activeFilter.comparison}
            {' '}
            {activeFilter.value}
          </span>
          <button
            data-testid="clear-filter-button"
            onClick={ () => handleRemoveFilter(index) }
          >
            Remover
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default FilterInput;
