import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface ContextType {
  planets: any[];
  setPlanets: Dispatch<SetStateAction<any[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export const PlanetsContext = createContext<ContextType>({
  planets: [],
  setPlanets: () => {},
  filter: '',
  setFilter: () => {},
});

export function PlanetsProvider({ children }: { children: ReactNode }) {
  const [planets, setPlanets] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');

  return (
    <PlanetsContext.Provider value={ { planets, setPlanets, filter, setFilter } }>
      {children}
    </PlanetsContext.Provider>
  );
}
