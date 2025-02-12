import AvailableInterchange from "./AvailableInterchange";
import ImposibleInterchange from "./ImposibleInterchange";

const InterchangeNotice = ({ seller, available, isFavorite }) => {

  return (
    <>
      {available ? (
        <AvailableInterchange seller={seller} isFavorite={isFavorite}/>
      ) : (
        <ImposibleInterchange seller={seller} />
      )}
    </>
  );
};

export default InterchangeNotice;
