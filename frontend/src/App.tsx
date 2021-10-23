import React from 'react';
import './App.css';
import SwapPanel from './components/SwapPanel';
import NFTPreview from './components/NFTPreview';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header__titles">
          <h1>Vasco</h1>
          <h3>{`Ethereum <-> Avalanche NFT Bridge`}</h3>
        </div>
        <div className="header__button">
         <Button onClick={() => console.log('click')}>connect</Button>
        </div>
      </header>
      <div className="body__container">
        <div className="swappanel__container">
          <SwapPanel />
        </div>
        <div className="preview__container">
          <NFTPreview nfts={[{ sup: 'hey' }]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
