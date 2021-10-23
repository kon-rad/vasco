import { createContext, ReactElement, useContext, useState } from 'react';

interface SupportedChainContextType {
  supportedChain: number;
  setSupportedChain: (supportedChain: number) => void;
}

const SupportedChainContext = createContext<SupportedChainContextType>({
  supportedChain: 1,
  setSupportedChain: () => null,
});

interface SupportedChainContextProviderProps {
  children: ReactElement;
}

export const SupportedChainContextProvider = ({
  children,
}: SupportedChainContextProviderProps) => {
  const [supportedChain, setSupportedChain] = useState<number>(1);
  return (
    <SupportedChainContext.Provider
      value={{ supportedChain, setSupportedChain }}
    >
      {children}
    </SupportedChainContext.Provider>
  );
};

export const useSupportedChain = () => useContext(SupportedChainContext);
