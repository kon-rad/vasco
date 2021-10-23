import './NFTPreview.css';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getNftsByOwner, getMetadata, addMetadata } from '../api';
import { NftsByOwner } from '../types';

type Props = {
  nfts: any[];
};
const NFTPreview = (props: Props) => {
  const [nfts, setNfts] = useState<NftsByOwner | null>();
  const [nftsWithMetadata, setNftsWithMetadata] =
    useState<NftsByOwner | null>();
  const { account } = useWeb3React();

  useEffect(() => {
    if (!account) {
      setNfts(null);
      setNftsWithMetadata(null);
      return;
    }
    const fetchNFTs = async () => {
      const {
        data: {
          data: { owner },
        },
      } = await getNftsByOwner('0xe1e5e3dc5f06dfc5a22698461078d9c46c02f957');
      setNfts(owner);
    };
    fetchNFTs();
  }, [account]);

  useEffect(() => {
    if (!nfts?.tokens?.length) return;
    const fetchMetadata = async () => {
      const nftsWithMetadata = await addMetadata(nfts);
      setNftsWithMetadata(nftsWithMetadata);
    };
    fetchMetadata();
  }, [nfts]);

  console.log('nfts', nfts);
  console.log('nftsWithMetadata', nftsWithMetadata);
  const renderNft = (nft: any) => {
    return (
      <div className='nftpreview__nft'>
        Data here {JSON.stringify(nftsWithMetadata)}
      </div>
    );
  };
  return (
    <div className='nftpreview'>
      <h3>select NFT</h3>
      <div className='nftpreview__scroll'>{props.nfts.map(renderNft)}</div>
      {JSON.stringify(nfts, null, 2)}
    </div>
  );
};

export default NFTPreview;
