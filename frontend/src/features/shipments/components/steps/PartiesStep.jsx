const PartiesStep = ({ data, onChange }) => {
  const handleConsigneeChange = (field, value) => {
    onChange({
      ...data,
        [field]: value,
    });
  };

  return (
    <div className="step-content">
      <div className="parties-section">
        <div className="party-section">
          <div className="party-title">
            <h3>Consignee</h3>
            <span className="party-subtitle">(Receiver)</span>
          </div>

          <div className="form-group">
            <label>Company name</label>
            <input
              type="text"
              placeholder="Company name"
              value={data.consigneeCompany}
              onChange={(e) => handleConsigneeChange("consigneeCompany", e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact person</label>
              <input
                type="text"
                placeholder="Full name"
                value={data.consigneeContactPerson}
                onChange={(e) => handleConsigneeChange("consigneeContactPerson", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={data.consigneeEmail}
                onChange={(e) => handleConsigneeChange("consigneeEmail", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              rows="3"
              placeholder="Street, city, postal code, country"
              value={data.consigneeAddress || ""}
              onChange={(e) => handleConsigneeChange("consigneeAddress", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartiesStep;
