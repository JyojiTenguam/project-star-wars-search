import { useContext } from 'react';
import { Planet } from '../types';
import { FilterContext } from '../context/FilterContext';

interface TableProps {
  planets: Planet[];
}

function Table({ planets }: TableProps) {
  console.log(planets, 'Planetas recebidos');

  const { filter } = useContext(FilterContext);
  console.log('Valor atual do filter:', filter);

  const filteredPlanets = planets.filter((planet) => (
    planet.name.toLowerCase().includes(filter.toLowerCase())
  ));
  console.log(filteredPlanets, 'Planetas filtrados');

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films.length}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
