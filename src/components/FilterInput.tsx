import React, { ChangeEvent, useContext, useState } from 'react';
import { FilterContext } from '../context/FilterContext';

function FilterInput() {
  const { filter, setFilter } = useContext(FilterContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter('');
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
      <button onClick={ handleClearFilter }>Limpar filtro</button>
    </div>
  );
}

export default FilterInput;
