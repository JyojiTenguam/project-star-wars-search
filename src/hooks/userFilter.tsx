import { Planet } from '../types';

function filteredPlanets(planets: Planet[], filter: string) {
  return planets.filter((planet) => (
    planet.name.toLowerCase().includes(filter.toLowerCase())
  ));
}

export { filteredPlanets };
