import { useState } from 'react';
import './SwapPanel.css';
import { useWeb3React } from '@web3-react/core';
import swap from '../images/swap.png';

const SwapPanel = () => {
    const [direction, setDirection] = useState<number>(0);
    const { deactivate } = useWeb3React();

    const handleSwap = () => {
        setDirection(direction === 0 ? 1 : 0)
        deactivate();
    }
    const renderDirection = ['Ethereum', 'Avalanche']
    return (
        <div className="swappanel">
            <div className="swappanel__sub">
                <span className="swappanel__label">From</span>
                <h3>{renderDirection[direction]}</h3>
            </div>
            <div className="swappanel__switch">
                <img src={swap} alt="" className="swappanel__img" onClick={handleSwap}/>
            </div>
            <div className="swappanel__sub">
                <span className="swappanel__label">To</span>
                <h3>{renderDirection[direction === 0 ? 1 : 0]}</h3>
            </div>
        </div>
    );
}

export default SwapPanel;
