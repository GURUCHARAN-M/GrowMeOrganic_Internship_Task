import * as React from 'react';
import ArtworkTable from './components/ArtworkTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Artworks Gallery</h1>
      <ArtworkTable />
    </div>
  );
};

export default App;
