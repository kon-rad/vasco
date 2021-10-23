import { useState } from 'react';
import './SwapPanel.css';
import { useWeb3React } from '@web3-react/core';
import { useSupportedChain } from '../contexts/supportedChain';
import swap from '../images/swap.png';
import EthLogo from '../images/eth_logo.png';
import AvaxLogo from '../images/avax_logo.png';

const SwapPanel = () => {
  const [direction, setDirection] = useState<number>(0);
  const { deactivate } = useWeb3React();
  const { setSupportedChain } = useSupportedChain();

  const handleSwap = () => {
    setDirection(direction === 0 ? 1 : 0);
    setSupportedChain(direction === 1 ? 1 : 43114);
    deactivate();
  };
  const renderDirection = ['Ethereum', 'Avalanche'];
  const renderIcon = (direction: number) => {
      return direction === 0 ? <img src={EthLogo} className="swappanel__logo" /> : <img src={AvaxLogo} className="swappanel__logo" />;
  }
  return (
    <div className='swappanel'>
      <div className='swappanel__sub'>
        <span className='swappanel__label'>From</span>
        <div className="swappanel__direction">
            {renderIcon(direction)}
            <h3>{renderDirection[direction]}</h3>
        </div>
      </div>
      <div className='swappanel__switch'>
        <img
          src={swap}
          alt=''
          className='swappanel__img'
          onClick={handleSwap}
        />
      </div>
      <div className='swappanel__sub'>
        <span className='swappanel__label'>To</span>
        <div className="swappanel__direction">
            {renderIcon(direction === 0 ? 1 : 0)}
            <h3>{renderDirection[direction === 0 ? 1 : 0]}</h3>
        </div>
      </div>
    </div>
  );
};

export default SwapPanel;
