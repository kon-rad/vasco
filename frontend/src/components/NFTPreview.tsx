import './NFTPreview.css';

type Props = {
    nfts: any[],
}
const NFTPreview = (props: Props) => {

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
            </div>
        )
}

export default NFTPreview;