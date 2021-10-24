import './NFTPreview.css';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getNftsByOwner, getMetadata, addMetadata } from '../api';
import { NftsByOwner, Token } from '../types';
import Card from './Card';

type Props = {
  nfts: any[];
};
const NFTPreview = (props: Props) => {
    const [selectedNft, setSelectedNft] = useState<Token | null>(null);
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

  const handleSelect = (tokenId: string, contractAddress: string) => {
    console.log('selected: ', tokenId, contractAddress);
  }
  const renderNft = (nft: any) => {
    return (
      <Card nft={nft} handleSelect={handleSelect}/>
    );
  };
  return (
    <div className='nftpreview'>
      <h3>select NFT</h3>
      <div className='nftpreview__scroll'>{nftsWithMetadata ? nftsWithMetadata.tokens.map(renderNft) : ''}</div>
    </div>
  );
};

export default NFTPreview;
