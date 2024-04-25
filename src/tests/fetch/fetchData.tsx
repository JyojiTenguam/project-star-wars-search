import React, { useEffect, FC } from 'react';
import { Planet } from '../../types';

interface FetchDataProps {
  setPlanetsData: (planets: Planet[]) => void;
}

const FetchData: FC<FetchDataProps> = ({ setPlanetsData }) => {
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://starwars-api-backup.vercel.app/planets');
        const data = await response.json();
        setPlanetsData(data.results.map((planet: Planet) => {
          const { residents, ...rest } = planet;
          return rest;
        }));
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };
    fetchPlanets();
  }, [setPlanetsData]);

  return null;
};

export default FetchData;
