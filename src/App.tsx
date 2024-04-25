import React, { useState } from 'react';
import FetchData from './tests/fetch/fetchData';
import Table from './tests/components/Table';
import { Planet } from './types';

function App(): React.ReactElement {
  const [planets, setPlanets] = useState<Planet[]>([]);

  return (
    <div>
      <FetchData setPlanetsData={ setPlanets } />
      <Table planets={ planets } />
    </div>
  );
}

export default App;
