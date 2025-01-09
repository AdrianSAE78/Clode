const CircleLabels = ({label, imgSrc}) => {
  const imageUrl = imgSrc ? `http://localhost:3000/uploads/${imgSrc}` : '/public/placeholder-image.png';
  return (
    <div className="categorie">
        {/* Img container */}
        <div className="categorie-image-container">
            <img src={imageUrl} alt={label} className="categorie-image"/>
        </div>
        <p className="label-medium">{label}</p>
    </div>
  )
}

export default CircleLabels