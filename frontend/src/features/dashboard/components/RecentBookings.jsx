import { ChevronRight } from "lucide-react";

const RecentBookings = ({ bookings }) => {
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
      case "delivered":
        return "#4caf50";
      case "in_transit":
        return "#f5a623";
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

  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-state">
        <p>No shipments found</p>
      </div>
    );
  }

  return (
    <div className="bookings-table">
      <table>
        <thead>
          <tr>
            <th>SHIPMENT #</th>
            <th>ROUTE</th>
            <th>CONSIGNEE</th>
            <th>WEIGHT</th>
            <th>PCS</th>
            <th>DEPARTURE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="shipment-id">
                <span>{booking.shipmentNumber}</span>
              </td>
              <td className="route">
                <span className="route-code">{booking.originAirport}</span>
                <span className="route-icon">→</span>
                <span className="route-code">{booking.destinationAirport}</span>
              </td>
              <td className="consignee">
                <span>{booking.consignee?.companyName}</span>
              </td>
              <td className="weight">
                <span>{booking.weight || 0} kg</span>
              </td>
              <td className="pieces">
                <span>{booking.pieces || 0}</span>
              </td>
              <td className="departure">
                <span>
                  {booking.departureDate
                    ? new Date(booking.departureDate).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "short" }
                      )
                    : "N/A"}
                </span>
              </td>
              <td className="status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {getStatusLabel(booking.status)}
                </span>
              </td>
              <td className="action">
                <ChevronRight size={18} color="#ccc" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;
