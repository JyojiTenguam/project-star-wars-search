import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { filteredPlanets } from '../hooks/userFilter';

function Table() {
  const { planets, filter,
    filteredPlanets: handleFilterResults } = useContext(FilterContext);

  const filterName = filteredPlanets(planets, filter);

  const applyFilters = () => {
    let filtered = filterName;

    // Aplica os outros filtros
    if (handleFilterResults.length > 0) {
      filtered = handleFilterResults;
    }

    return filtered;
  };

  const planetsToRender = applyFilters();

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
        {planetsToRender.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
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
