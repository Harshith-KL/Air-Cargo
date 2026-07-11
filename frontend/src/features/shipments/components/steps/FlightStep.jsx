const FlightStep = ({ data, onChange }) => {
  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const getRouteDisplay = () => {
    return `${data.originAirport} → ${data.destinationAirport}`;
  };

  const getCargoInfo = () => {
    return `${data.pieces} pcs · ${data.weight} kg · ${data.weight ? (data.weight / 1000).toFixed(2) : 0} m³`;
  };

  const getServiceInfo = () => {
    return `${data.serviceLevel} · ${data.preferredAirline || "Lufthansa"}`;
  };

  return (
    <div className="step-content">
      <div className="form-row">
        <div className="form-group">
          <label>Preferred departure</label>
          <input
            type="date"
            value={data.preferredDepartureDate}
            onChange={(e) => handleInputChange("preferredDepartureDate", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Preferred airline</label>
          <select
            value={data.preferredAirline}
            onChange={(e) => handleInputChange("preferredAirline", e.target.value)}
          >
            <option value="">Select airline</option>
            <option value="Lufthansa">Lufthansa</option>
            <option value="Air France">Air France</option>
            <option value="United Cargo">United Cargo</option>
            <option value="Emirates">Emirates</option>
            <option value="Qatar Airways">Qatar Airways</option>
            <option value="Singapore Airlines">Singapore Airlines</option>
            <option value="Cathay Pacific">Cathay Pacific</option>
          </select>
        </div>
      </div>

      <div className="service-section">
        <label>Service level</label>
        <div className="service-options">
          {["Standard", "Express", "Priority"].map((level) => (
            <button
              key={level}
              className={`service-btn ${
                data.serviceLevel === level ? "active" : ""
              }`}
              onClick={() => handleInputChange("serviceLevel", level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-row">
          <span className="summary-label">Route</span>
          <span className="summary-value">{getRouteDisplay()}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Cargo</span>
          <span className="summary-value">{getCargoInfo()}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Service</span>
          <span className="summary-value">{getServiceInfo()}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightStep;
