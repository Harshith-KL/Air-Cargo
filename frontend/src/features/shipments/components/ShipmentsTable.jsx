import { MoreVertical } from "lucide-react";

const ShipmentsTable = ({ shipments }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "draft":
        return "#888888";
      case "submitted":
        return "#4a90e2";
      case "confirmed":
        return "#4a90e2";
      case "in transit":
        return "#f5a623";
      case "in_transit":
        return "#f5a623";
      case "delivered":
        return "#4caf50";
      default:
        return "#888888";
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      "draft": "Draft",
      "submitted": "Submitted",
      "confirmed": "Confirmed",
      "in_transit": "In Transit",
      "in transit": "In Transit",
      "delivered": "Delivered",
    };
    return statusMap[status?.toLowerCase()] || status;
  };

  if (!shipments || shipments.length === 0) {
    return (
      <div className="empty-state">
        <p>No shipments found</p>
      </div>
    );
  }

  return (
    <div className="shipments-table-container">
      <table className="shipments-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>SHIPMENT #</th>
            <th>ROUTE</th>
            <th>CONSIGNEE</th>
            <th>COMMODITY</th>
            <th>SERVICE</th>
            <th>WEIGHT</th>
            <th>PCS</th>
            <th>DEPARTURE</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="shipment-id">{shipment.shipmentNumber}</td>
              <td className="route">
                <span className="route-code">{shipment.origin}</span>
                <span className="route-icon">→</span>
                <span className="route-code">{shipment.destination}</span>
              </td>
              <td className="consignee">
                {shipment.consignee?.companyName}
              </td>
              <td className="commodity">
                {shipment.commodityType || "Standard"}
              </td>
              <td className="service">
                <span className="service-badge">
                  {shipment.serviceLevel || "Standard"}
                </span>
              </td>
              <td className="weight">{shipment.weight || 0} kg</td>
              <td className="pieces">{shipment.pieces || 0}</td>
              <td className="departure">
                {shipment.departureDate
                  ? new Date(shipment.departureDate).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "short" }
                    )
                  : "N/A"}
              </td>
              <td className="status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(shipment.status) }}
                >
                  {getStatusLabel(shipment.status)}
                </span>
              </td>
              <td className="action">
                <button className="action-btn">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentsTable;
