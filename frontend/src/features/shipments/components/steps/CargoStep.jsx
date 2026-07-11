import { useEffect, useState } from "react";

const CargoStep = ({ data, onChange }) => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    // Calculate volume: length * width * height (in cm³, then convert to m³)
    if (data.length && data.width && data.height) {
      const vol = (data.length * data.width * data.height) / 1000000;
      setVolume(vol.toFixed(2));
    } else {
      setVolume(0);
    }
  }, [data.length, data.width, data.height]);

  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <div className="form-row">
        <div className="form-group">
          <label>Number of pieces</label>
          <input
            type="number"
            min="0"
            value={data.pieces}
            onChange={(e) => handleInputChange("pieces", Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Gross weight <span className="unit">kg</span></label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={data.grossWeight}
            onChange={(e) => handleInputChange("grossWeight", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="dimensions-section">
        <p className="dimensions-label">Dimensions</p>
        <div className="form-row dimensions-row">
          <div className="form-group">
            <label>Length <span className="unit">cm</span></label>
            <input
              type="number"
              min="0"
              value={data.length}
              onChange={(e) => handleInputChange("length", Number(e.target.value))}
            />
          </div>

          <span className="dimension-separator">×</span>

          <div className="form-group">
            <label>Width <span className="unit">cm</span></label>
            <input
              type="number"
              min="0"
              value={data.width}
              onChange={(e) => handleInputChange("width", Number(e.target.value))}
            />
          </div>

          <span className="dimension-separator">×</span>

          <div className="form-group">
            <label>Height <span className="unit">cm</span></label>
            <input
              type="number"
              min="0"
              value={data.height}
              onChange={(e) => handleInputChange("height", Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="volume-section">
        <label>Volume <span className="unit">auto-calculated</span></label>
        <input
          type="text"
          value={volume ? `${volume} m³` : "–"}
          disabled
          className="volume-input"
        />
      </div>
    </div>
  );
};

export default CargoStep;
