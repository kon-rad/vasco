import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import './App.css';
import { SupportedChainContextProvider } from './contexts/supportedChain';
import SwapPanel from './components/SwapPanel';
import NFTPreview from './components/NFTPreview';
import Wallet from './components/Wallet';
import Logo from './components/Logo';

const getLibrary = (provider: ExternalProvider): Web3Provider => {
  return new Web3Provider(provider);
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <SupportedChainContextProvider>
        <div className='App'>
          <header className='header'>
            <div className='header__titles'>
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
              <NFTPreview nfts={[{ sup: 'hey' }]} />
            </div>
          </div>{' '}
        </div>
      </SupportedChainContextProvider>
    </Web3ReactProvider>
  );
}

export default App;
