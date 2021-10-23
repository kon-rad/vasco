import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 5 });

const SUBGRAPH_URL =
  process.env.SUBGRAPH_URL ||
  'https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph';

const processSubgraphRequest = async (query: string) => {
  try {
    const response = await axios.post(SUBGRAPH_URL, { query, setTimeout: 10 });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getNFTsByOwner = (id: string): Promise<any> => {
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
