import './NFTPreview.css';
import { useEffect, useState } from 'react';
import { getNFTsByOwner } from '../api';

type Props = {
    nfts: any[],
}
const NFTPreview = (props: Props) => {
    const [nfts, setNfts] = useState({});
  
    useEffect(() => {
      const fetchNFTs = async () => {
        const {
          data: {
            data: { owner },
          },
        } = await getNFTsByOwner('0x7be8076f4ea4a4ad08075c2508e481d6c946d12b');
        setNfts(owner);
      };
      fetchNFTs();
    }, []);

    const renderNft = (nft: any) => {
        return (
            <div className="nftpreview__nft">
                Data here {JSON.stringify(nft)}
            </div>
        )
    }
    return (
            <div className="nftpreview">
                <h3>select NFT</h3>
                <div className="nftpreview__scroll">
                    {props.nfts.map(renderNft)}
                </div>
                {JSON.stringify(nfts, null, 2)}
            </div>
        )
}


export default NFTPreview;
