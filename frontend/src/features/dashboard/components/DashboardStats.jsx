import { TrendingUp, TrendingDown } from "lucide-react";

const DashboardStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      icon: "📦",
      label: "Active shipments",
      value: stats.activeShipments || 0,
      change: stats.activeShipmentsChange || 0,
    },
    {
      icon: "⏳",
      label: "Pending bookings",
      value: stats.pendingBookings || 0,
      change: stats.pendingBookingsChange || 0,
    },
    {
      icon: "✓",
      label: "Confirmed",
      value: stats.confirmedShipments || 0,
      change: stats.confirmedChange || 0,
    },
    {
      icon: "🚚",
      label: "In transit",
      value: stats.inTransitShipments || 0,
      change: stats.inTransitChange || 0,
    },
    {
      icon: "📍",
      label: "Delivered",
      value: stats.deliveredShipments || 0,
      change: stats.deliveredChange || 0,
    },
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">{stat.icon}</span>
            <div className={`stat-change ${stat.change >= 0 ? "positive" : "negative"}`}>
              {stat.change >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {Math.abs(stat.change)}%
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
          <div className="stat-chart">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <polyline
                points="0,30 10,25 20,20 30,15 40,22 50,18 60,25 70,20 80,15 90,10 100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
