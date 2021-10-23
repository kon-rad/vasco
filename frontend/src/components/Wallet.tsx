import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import Button from './Button';

const Wallet = () => {
  const { account, activate, deactivate } = useWeb3React();
  const injected = new InjectedConnector({ supportedChainIds: [1, 43114] });
  const connect = () => activate(injected);
  const disconnect = () => deactivate();
  return (
    <>
      {account ? (
        <Button onClick={disconnect}>{account.substring(1, 18)}…</Button>
      ) : (
        <Button onClick={connect}>connect account</Button>
      )}
    </>
  );
};

export default Wallet;
