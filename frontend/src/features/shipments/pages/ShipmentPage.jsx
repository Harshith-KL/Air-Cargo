import { useState, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import ShipmentsTable from "../components/ShipmentsTable";
import CreateShipmentModal from "../components/CreateShipmentModal";
import { useShipments } from "../hooks/useShipment";
import { Plus, Download } from "lucide-react";
import "../styles/ShipmentPage.css";

const ShipmentPage = () => {
  const { shipments, loading, fetchShipments, totalPages } = useShipments();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "All",
    origin: "All",
    destination: "All",
    service: "All",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

useEffect(() => {
  const apiFilters = {};

  if (filters.status !== "All") {
    apiFilters.status = filters.status;
  }

  if (filters.origin !== "All") {
    apiFilters.originAirport = filters.origin;
  }

  if (filters.destination !== "All") {
    apiFilters.destinationAirport = filters.destination;
  }

  if (filters.service !== "All") {
    apiFilters.serviceLevel = filters.service;
  }

  fetchShipments(apiFilters, currentPage, 12);
}, [filters, currentPage, fetchShipments]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchShipments(filters, currentPage, 12);
  };

  const handleShipmentCreated = () => {
    setShowCreateModal(false);
    handleRefresh();
  };

  return (
    <MainLayout>
      <div className="shipments-page">
        {/* Header */}
        <div className="shipments-header">
          <div>
            <h1 className="page-title">Shipments</h1>
            <p className="page-subtitle">{shipments.length} of {shipments.length} shipments</p>
          </div>
          <div className="header-actions">
            <button className="export-btn">
              <Download size={18} />
              Export
            </button>
            <button
              className="new-shipment-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={18} />
              New shipment
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option>All</option>
              <option>Draft</option>
              <option>Submitted</option>
              <option>Confirmed</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Origin</label>
            <select
              value={filters.origin}
              onChange={(e) => handleFilterChange("origin", e.target.value)}
            >
              <option>All</option>
              <option>BLR</option>
              <option>DEL</option>
              <option>DXB</option>
              <option>FRA</option>
              <option>NRT</option>
              <option>SIN</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Destination</label>
            <select
              value={filters.destination}
              onChange={(e) => handleFilterChange("destination", e.target.value)}
            >
              <option>All</option>
              <option>BLR</option>
              <option>DEL</option>
              <option>DXB</option>
              <option>FRA</option>
              <option>NRT</option>
              <option>SIN</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Service</label>
            <select
              value={filters.service}
              onChange={(e) => handleFilterChange("service", e.target.value)}
            >
              <option>All</option>
              <option>Standard</option>
              <option>Express</option>
              <option>Priority</option>
            </select>
          </div>
        </div>

        {/* Shipments Table */}
        {loading ? (
          <div className="loading">Loading shipments...</div>
        ) : (
          <ShipmentsTable shipments={shipments} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Create Shipment Modal */}
      {showCreateModal && (
        <CreateShipmentModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleShipmentCreated}
        />
      )}
    </MainLayout>
  );
};

export default ShipmentPage;