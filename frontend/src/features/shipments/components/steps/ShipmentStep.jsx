const ShipmentStep = ({ data, onChange, airports }) => {
  // console.log("Airports:", airports);
  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      {" "}
      <div className="form-group">
        {" "}
        <label>Cargo description</label>{" "}
        <textarea
          placeholder="e.g. Temperature-sensitive vaccines, palletised"
          value={data.cargoDescription}
          onChange={(e) =>
            handleInputChange("cargoDescription", e.target.value)
          }
          rows="3"
        />{" "}
      </div>{" "}
      <div className="form-row">
        {" "}
        <div className="form-group">
          {" "}
          <label>Commodity type</label>{" "}
          <select
            value={data.commodityType}
            onChange={(e) => handleInputChange("commodityType", e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Machine parts">Machine parts</option>
            <option value="Textiles & apparel">Textiles &amp; apparel</option>
            <option value="Perishable foods">Perishable foods</option>
            <option value="Automotive parts">Automotive parts</option>
            <option value="Aircraft components">Aircraft components</option>
            <option value="Consumer goods">Consumer goods</option>
          </select>
        </div>
        <div className="form-group">
          <label>Special handling</label>
          <select
            value={data.specialHandling}
            onChange={(e) =>
              handleInputChange("specialHandling", e.target.value)
            }
          >
            <option value="None">None</option>
            <option value="Fragile">Fragile</option>
            <option value="Temperature Controlled">Temperature Controlled</option>
            <option value="Dangerous Goods">Dangerous Goods</option>
            <option value="Live Animals">Live Animals</option>
            <option value="Perishable">Perishable</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        {" "}
        <div className="form-group">
          {" "}
          <label>Origin airport</label>{" "}
          <select
            value={data.originAirport}
            onChange={(e) => handleInputChange("originAirport", e.target.value)}
          >
            {" "}
            <option value="">Select airport</option>{" "}
            {airports.map((airport) => (
              <option key={airport._id} value={airport._id}>
                {" "}
                {airport.code} · {airport.name}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
        <div className="form-group">
          {" "}
          <label>Destination airport</label>{" "}
          <select
            value={data.destinationAirport}
            onChange={(e) => handleInputChange("destinationAirport", e.target.value)}
          >
            {" "}
            <option value="">Select airport</option>{" "}
            {airports.map((airport) => (
              <option key={airport._id} value={airport._id}>
                {" "}
                {airport.code} · {airport.name}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ShipmentStep;
