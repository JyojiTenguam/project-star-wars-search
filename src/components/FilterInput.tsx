import React, { ChangeEvent, useContext, useState, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';

function FilterInput() {
  const { filter, setFilter, planets, setFilteredPlanets } = useContext(FilterContext);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  useEffect(() => {
    console.log('filterValues após a atualização:', filterValues);
  }, [filterValues]);

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
  };

  const handleFilter = () => {
    console.log('handleFilter foi chamada');
    console.log('Valores do filtro no início da função handleFilter:', filterValues);

    if (!filterValues.column) {
      console.log('Coluna de filtro não definida, pulando a filtragem');
      return;
    }

    const filteredData = planets.filter((planet: any) => {
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
    </div>
  );
}

export default FilterInput;
