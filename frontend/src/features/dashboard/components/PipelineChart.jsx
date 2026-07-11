const PipelineChart = ({ pipeline }) => {
  if (!pipeline) return null;

  const statusColors = {
    Draft: "#888888",
    Submitted: "#4a90e2",
    Confirmed: "#4a90e2",
    "Picked Up": "#00bcd4",
    "In Transit": "#f5a623",
    Arrived: "#9c27b0",
    Delivered: "#4caf50",
  };

  const totalShipments = Object.values(pipeline).reduce((a, b) => a + b, 0);

  return (
    <div className="pipeline-chart">
      <div className="pipeline-bars">
        {Object.entries(pipeline).map(([status, count], index) => {
          const percentage = totalShipments > 0 ? (count / totalShipments) * 100 : 0;
          const color = statusColors[status] || "#888888";

          return (
            <div key={index} className="pipeline-item">
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div className="bar-label">
                <span className="label-status">{status}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pipeline-legend">
        {Object.entries(pipeline).map(([status, count], index) => {
          const color = statusColors[status] || "#888888";

          return (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: color }}
              />
              <div className="legend-info">
                <span className="legend-status">{status}</span>
                <span className="legend-count">{count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineChart;
