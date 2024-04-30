import React, { useState, useContext, useCallback } from 'react';
import { FilterContext } from '../context/FilterContext';

function Sort() {
  const { setPlanets, planets } = useContext(FilterContext);
  const [sort, setSort] = useState({ column: 'population', order: 'ASC' });
  const { columns } = useContext(FilterContext);
  const [order, setOrder] = useState('ASC');

  const handleSort = useCallback(() => {
    console.log('handleSort chamado');
    const sortedPlanets = [...planets].sort((a: any, b: any) => {
      const valueA = a[sort.column as keyof typeof a];
      const valueB = b[sort.column as keyof typeof b];

      if (valueA === 'unknown' && valueB === 'unknown') {
        return 0;
      } if (valueA === 'unknown') {
        return 1;
      } if (valueB === 'unknown') {
        return -1;
      }

      const numA = Number(valueA);
      const numB = Number(valueB);

      if (order === 'ASC') {
        return numA - numB;
      }
      return numB - numA;
    });

    console.log('Planetas ordenados:', sortedPlanets);
    setPlanets(sortedPlanets);
  }, [planets, sort, setPlanets, order]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement
  | HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`handleSortChange chamado, ${name}: ${value}`);
    if (name === 'order') {
      setOrder(value);
    } else {
      setSort((prevSort) => ({ ...prevSort, [name]: value }));
    }
  };

  const handleSortSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('handleSortSubmit chamado');
    event.preventDefault(); // Evita o comportamento padrão do formulário
    handleSort();
  };

  return (
    <div>
      <select name="column" data-testid="column-sort" onChange={ handleSortChange }>
        {columns.map((column: string) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>

      <label>
        Ascendente
        <input
          type="radio"
          name="order"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ handleSortChange }
          defaultChecked
        />
      </label>

      <label>
        Descendente
        <input
          type="radio"
          name="order"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleSortChange }
        />
      </label>

      <button
        type="submit"
        data-testid="column-sort-button"
        onClick={ handleSortSubmit }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Sort;
