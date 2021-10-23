import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import './App.css';
import SwapPanel from './components/SwapPanel';
import NFTPreview from './components/NFTPreview';
import Wallet from './components/Wallet';
import logo from './images/logo.svg';
import Logo from './components/Logo';

const getLibrary = (provider: ExternalProvider): Web3Provider => {
  return new Web3Provider(provider);
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='app'>
        <header className='header'>
          <div className='header__titles'>
            {/* <img src={logo} alt="" className="header__logo" /> */}
            <Logo />
            <h1>Vasco</h1>
            <h3>{`Ethereum <-> Avalanche NFT Bridge`}</h3>
          </div>
          <div className='header__button'>
            <Wallet />
          </div>
        </header>
        <div className='body__container'>
          <div className='swappanel__container'>
            <SwapPanel />
          </div>
          <div className='preview__container'>
          <NFTPreview nfts={[{ sup: 'hey' }]}/>
          </div>
        </div>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
