const ItemCatalog = ({ image, icon, categorieName, itemDescription }) => {
  return (
    <div className="item-catalog">
      <div className="item-catalog-image-container">
        <img src={image} alt={`Fotografía de ${itemDescription}`} />
      </div>

      <div className="item-catalog-categorie">
        <div className="icon">
          {/* icon */}
          <img
            className="item-catalog-categorie-icon"
            src={icon}
            alt="Icon categorie"
          />
        </div>
        <p className="body-medium">{categorieName}</p>
      </div>
      <p className="body-medium description">{itemDescription}</p>
    </div>
  );
};

export default ItemCatalog;
