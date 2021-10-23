import axios from 'axios';
import axiosRetry from 'axios-retry';
import { NftsByOwner, Token } from './types';

axiosRetry(axios, { retries: 0 });

const SUBGRAPH_URL =
  process.env.SUBGRAPH_URL ||
  'https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph';

const PROXY = process.env.PROXY || 'https://warm-crag-23907.herokuapp.com/';

export const addMetadata = async (nfts: NftsByOwner): Promise<NftsByOwner> => {
  const tokens = await Promise.all(
    nfts.tokens.map(async (token: Token): Promise<Token> => {
      const metadataUri = token?.tokenURI;
      const response = metadataUri ? await getMetadata(metadataUri) : null;
      const metadata = response ? response?.data : {};
      return { ...token, metadata };
    })
  );
  return { ...nfts, tokens };
};

export const getMetadata = async (uri: string): Promise<any> => {
  try {
    if (!uri) return {};
    const response = await axios.get(`${PROXY}${uri}`);
    return response;
  } catch (err) {
    // console.log(err);
  }
};

const processSubgraphRequest = async (query: string) => {
  try {
    const response = await axios.post(SUBGRAPH_URL, { query, setTimeout: 10 });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getNftsByOwner = (id: string): Promise<any> => {
  const query = `
  {
    owner(id: "${id.toLowerCase()}") {
      id
      tokens {
        id
        contract {
          id
          name
          symbol
          doAllAddressesOwnTheirIdByDefault
          supportsEIP721Metadata
          numTokens
          numOwners
        }
        tokenID
        mintTime
        tokenURI
      }
      numTokens
    }
  }  
  `;

  return processSubgraphRequest(query);
};
