import './SwapPanel.css';
import swap from '../images/swap.png';

const SwapPanel = () => {
    return (
        <div className="swappanel">
            <div className="swappanel__sub">
                <span className="swappanel__label">From</span>
                <h3>Ethereum</h3>
            </div>
            <div className="swappanel__switch">
                <img src={swap} alt="" className="swappanel__img" />
            </div>
            <div className="swappanel__sub">
                <span className="swappanel__label">To</span>
                <h3>Avalanche</h3>
            </div>
        </div>
    );
}

export default SwapPanel;
