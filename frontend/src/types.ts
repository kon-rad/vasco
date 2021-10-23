interface Contract {
  doAllAddressesOwnTheirIdByDefault: boolean;
  id: string;
  name: string;
  numOwners: string;
  numTokens: string;
  supportsEIP721Metadata: boolean;
  symbol: string;
}

export interface Token {
  contract: Contract;
  id: string;
  mintTime: string; // timestamp
  tokenId: string;
  tokenURI: string;
  metadata?: Record<string, any> | EmptyObject;
}

export interface NftsByOwner {
  id: string;
  numTokens: string;
  tokens: Token[];
}

export type EmptyObject = Record<string, never>;
