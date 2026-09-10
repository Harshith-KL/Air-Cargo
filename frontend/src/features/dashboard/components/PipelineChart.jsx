const PipelineChart = ({ pipeline }) => {
  if (!pipeline) return null;

  const statusColors = {
    Draft: "#8a9aad",
    Submitted: "#1677c8",
    Confirmed: "#0d9488",
    "Picked Up": "#27a9b8",
    "In Transit": "#d9822b",
    Arrived: "#7567b8",
    Delivered: "#158a68",
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
