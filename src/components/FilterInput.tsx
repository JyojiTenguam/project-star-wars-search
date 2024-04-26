import React, { ChangeEvent, useContext, useState } from 'react';
import { FilterContext } from '../context/FilterContext';

function FilterInput() {
  const [inputValue, setInputValue] = useState('');
  const { setFilter } = useContext(FilterContext);

  console.log(inputValue, 'Valor digitado no campo');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, 'Valor atual do campo de entrada');
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    console.log(inputValue, 'Valor de inputValue');
    setFilter(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filter by name..."
        value={ inputValue }
        onChange={ handleInputChange }
      />
      <button onClick={ handleButtonClick }>Filtrar</button>
    </div>
  );
}

export default FilterInput;
