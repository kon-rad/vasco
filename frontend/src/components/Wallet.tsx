import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useSupportedChain } from '../contexts/supportedChain';
import Button from './Button';

const Wallet = () => {
  const { account, activate, deactivate, error } = useWeb3React<Web3Provider>();
  const { supportedChain } = useSupportedChain();
  const injected = new InjectedConnector({
    supportedChainIds: [supportedChain],
  });
  const connect = () => activate(injected);
  const disconnect = () => deactivate();
  const walletStatus = error ? 'error' : account ? 'connected' : 'disconnected';
  return (
    <>
      {walletStatus === 'connected' && (
        <Button onClick={disconnect}>{account?.substring(1, 18)}…</Button>
      )}
      {walletStatus === 'disconnected' && (
        <Button onClick={connect}>connect account</Button>
      )}
      {walletStatus === 'error' && (
        <div>
          please switch to {supportedChain === 1 ? 'Ethereum' : 'Avalanche'}
        </div>
      )}
    </>
  );
};

export default Wallet;
