import { useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import DashboardStats from "../components/DashboardStats";
import RecentBookings from "../components/RecentBookings";
import PipelineChart from "../components/PipelineChart";
import { useDashboardStats, useDashboardPipeline, useDashboardRecentBookings } from "../hooks/useDashboard";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const { stats, loading: statsLoading } = useDashboardStats();
  const { pipeline, loading: pipelineLoading } = useDashboardPipeline();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { bookings, loading: bookingsLoading } = useDashboardRecentBookings(selectedStatus);

  const statuses = ["All", "Draft", "Submitted", "Confirmed", "In Transit", "Delivered"];

  return (
    <MainLayout>
      <div className="dashboard-page">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        {statsLoading ? (
          <div className="loading">Loading stats...</div>
        ) : (
          <DashboardStats stats={stats} />
        )}

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Recent Bookings */}
          <div className="recent-bookings-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Recent bookings</h2>
                <p className="section-count">
                  {bookings.length} shipments
                </p>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="status-tabs">
              {statuses.map((status) => (
                <button
                  key={status}
                  className={`tab ${selectedStatus === status ? "active" : ""}`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {bookingsLoading ? (
              <div className="loading">Loading bookings...</div>
            ) : (
              <RecentBookings bookings={bookings} />
            )}
          </div>

          {/* Pipeline Chart */}
          {!pipelineLoading && pipeline && (
            <div className="pipeline-section">
              <h2 className="section-title">Pipeline</h2>
              <PipelineChart pipeline={pipeline} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;