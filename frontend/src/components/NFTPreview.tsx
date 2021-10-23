import { useEffect, useState } from 'react';
import { getNFTsByOwner } from '../api';

const NFTPreview = () => {
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

  return <code>NFTPreview {JSON.stringify(nfts, null, 2)}</code>;
};

export default NFTPreview;
