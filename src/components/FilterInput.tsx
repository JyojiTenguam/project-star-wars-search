import React, { ChangeEvent, useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';

type FilterType = {
  column: string;
  comparison: string;
  value: string;
};

function FilterInput() {
  const { filter, setFilter, planets, setFilteredPlanets } = useContext(FilterContext);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  useEffect(() => {
    console.log('filterValues após a atualização:', filterValues);
  }, [filterValues]);

  useEffect(() => {
    if (Array.isArray(planets)) {
      let filteredData = [...planets]; // começa com todos os planetas

      // Adiciona a funcionalidade de filtrar pelo nome
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
    console.log('handleInputChange foi chamada');
    setFilter(event.target.value);
  };

  const handleFilterChange = (event:
  ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log('handleFilterChange foi chamada');
    setFilterValues({
      ...filterValues,
      [event.target.name]: event.target.value,
    });
    console.log('filterValues após a atualização:', filterValues);
  };

  const handleClearFilter = () => {
    console.log('handleClearFilter foi chamada');
    setFilter('');
    setFilterValues({
      column: '',
      comparison: '',
      value: '',
    });
    setFilteredPlanets([]); // Definindo os planetas filtrados como um array vazio
  };

  const handleFilter = () => {
    console.log('handleFilter foi chamada');
    console.log('Valores do filtro no início da função handleFilter:', filterValues);

    if (!filterValues.column) {
      console.log('Coluna de filtro não definida, pulando a filtragem');
      return;
    }

    const filteredData = planets.filter((planet: any) => {
      // Adiciona a funcionalidade de filtrar pelo nome
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
  };

  const handleRemoveFilter = (index: number) => {
    const newActiveFilters = [...activeFilters];
    newActiveFilters.splice(index, 1);
    setActiveFilters(newActiveFilters);
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
        <div key={ index }>
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
    </div>
  );
}

export default FilterInput;
