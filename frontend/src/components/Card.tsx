import NFTPreview from "./NFTPreview";
import './Card.css';

type Props = {
    nft: any,
    handleSelect: any,
    isSelected: boolean,
}

const Card = (props: Props) => {
    const { nft, handleSelect, isSelected } = props;
    const getImageUrl = (image: string) => {
        if (!image) return '';
        if (image.match('https://')) {
            return image;
        }
        const ipfsNum = image.split('ipfs://')[1];
        return `https://ipfs.io/ipfs/${ipfsNum}`;
    }
    return (
        <div className={`card ${isSelected ? 'active' : ''}`} onClick={() => handleSelect(nft?.tokenID, nft?.contract?.id, nft)}>
            <img src={getImageUrl(nft?.metadata?.image)} alt="" className="card__img" />
            <div className="card__body">
                <div className="card__token">{nft?.tokenID}</div>
                <div className="card__name">{nft?.contract?.name}</div>
                <div className="card__addr">{nft?.contract?.id?.substring(0, 6)}…{nft?.contract?.id?.substring(nft?.contract?.id?.length-4, nft?.contract?.id?.length)}</div>
                <a href={`https://opensea.io/assets/${nft?.contract?.id}/${nft?.tokenID}`} target="_blank">View on OpenSea</a>
            </div>
        </div>
    )
}

export default Card;
