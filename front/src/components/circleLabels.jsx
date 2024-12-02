const CircleLabels = ({label, imgSrc}) => {
  return (
    <div className="categorie">
        {/* Img container */}
        <div className="categorie-image-container">
            <img src={imgSrc} className="categorie-image"/>
        </div>
        <p className="label-medium">{label}</p>
    </div>
  )
}

export default CircleLabels