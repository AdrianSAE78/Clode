const Metrics = ({ number, unidad, estado, icon, active }) => {
  return (
    <>
      {!active ? (
        <div className="metric-item">
          <div className="metric-content">
            {/* icon */}
            <div className="icon-container">
              <img src={icon} alt="" className="icon" />
            </div>
            <p className="body-medium">
              {number + " "}
              <span className="body-small">{unidad}</span>
            </p>
          </div>

          <p className="body-medium state">{estado}</p>
        </div>
      ) : (
        <div className="metric-item variant">
          <div className="metric-content">
            {/* icon */}
            <div className="icon-container">
              <img src={icon} alt="" className="icon" />
            </div>
            <p className="body-medium">
              {number + " "}
              <span className="body-small">{unidad}</span>
            </p>
          </div>

          <p className="body-medium state">{estado}</p>
        </div>
      )}
    </>
  );
};

export default Metrics;
