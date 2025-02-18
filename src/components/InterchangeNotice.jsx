import AvailableInterchange from "./AvailableInterchange";
import ImposibleInterchange from "./ImposibleInterchange";

const InterchangeNotice = ({
  seller,
  available,
  isFavorite,
  receivedGarmentId,
  sellerId,
  onToggleFavorite
}) => {
  return (
    <>
      {available ? (
        <AvailableInterchange
          seller={seller}
          isFavorite={isFavorite}
          receivedGarmentId={receivedGarmentId}
          sellerId={sellerId}
        />
      ) : (
        <ImposibleInterchange seller={seller} />
      )}
    </>
  );
};

export default InterchangeNotice;