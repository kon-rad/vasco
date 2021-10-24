import './NFTPreview.css';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getNftsByOwner, getMetadata, addMetadata } from '../api';
import { NftsByOwner, Token } from '../types';
import Card from './Card';
import successIcon from '../images/success.jpg';

type Props = {
  nfts: any[];
};
const NFTPreview = (props: Props) => {
    const [transfer, setTransfer] = useState<boolean>(false);
  const [selectedNft, setSelectedNft] = useState<any>(null);
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

  const handleSelect = (tokenId: string, contractAddress: string, nft: Token) => {
    console.log('selected: ', tokenId, contractAddress);
    setSelectedNft({ tokenId, contractAddress, nft });
  }
  const renderNft = (nft: any) => {
      console.log(selectedNft && nft?.tokenID === selectedNft.tokenId, selectedNft && nft?.tokenID, selectedNft && selectedNft.tokenId)
    return (
      <Card nft={nft} handleSelect={handleSelect} isSelected={selectedNft && nft?.tokenID === selectedNft?.tokenId}/>
    );
  };
  const handleTransfer = () => {
      setTransfer(!transfer);
  }
  const renderPreview = () => {
      if (transfer) {
          return (
            <div className="nftpreview__body">
                  <div className="nftpreview__successTop">
                  <h3>SUCCESS!</h3>
                  <img src={successIcon} alt="" className="nftpreview__success" />
                  <h3>Your NFT has been transferred to Avalanche</h3>
                  <a href="https://etherscan.com/" className="nftpreview__txnLink">View transaction on Etherscan</a>
                  <Card nft={selectedNft.nft} isSelected={true} handleSelect={handleSelect}/>
              </div>
              <div className="nftpreview__btnWrapper">
                  <button className="nftpreview__transfer" onClick={handleTransfer}>NEW TRANSFER</button>
              </div>
            </div>
          )
      }
      return (
          <div className="nftpreview__body nftpreview__body--selector">
                <div className="nftpreview__top">
                <h3>SELECT NFT</h3>
                <div className="nftpreview__searchWrapper">
                    <input type="text" className="nftpreview__search" placeholder="search" />
                </div>
                <div className='nftpreview__scroll'>{nftsWithMetadata ? nftsWithMetadata.tokens.map(renderNft) : ''}</div>
            </div>
            <div className="nftpreview__btnWrapper">
                <button className="nftpreview__transfer" onClick={handleTransfer}>TRANSFER</button>
            </div>
          </div>
      )
  }
  return (
        <div className='nftpreview'>
            {renderPreview()}
        </div>
    );
};

export default NFTPreview;
