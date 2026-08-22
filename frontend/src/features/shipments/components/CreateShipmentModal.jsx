import { useState, useEffect } from "react";
import { X, ChevronLeft } from "lucide-react";
import { useCreateShipment, useAirports } from "../hooks/useShipment";
import ShipmentStep from "./steps/ShipmentStep";
import CargoStep from "./steps/CargoStep";
import PartiesStep from "./steps/PartiesStep";
import FlightStep from "./steps/FlightStep";
import "../styles/CreateShipmentModal.css";

const CreateShipmentModal = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { airports, fetchAirports } = useAirports();
  const { create } = useCreateShipment();

  const [formData, setFormData] = useState({
    // Step 1: Shipment
    cargoDescription: "",
    commodityType: "Electronics",
    specialHandling: "None",
    originAirport: "",
    destinationAirport: "",

    // Step 2: Cargo
    pieces: 0,
    grossWeight: 0,
    length: 0,
    width: 0,
    height: 0,

    // Step 3: Parties
    consigneeCompany:"",
    consigneeContactPerson:"",
    consigneeEmail:"",
    consigneeAddress:"",

    // Step 4: Flight
    preferredDepartureDate: "",
    preferredAirline: "",
    serviceLevel: "Standard",
  });

  useEffect(() => {
    fetchAirports();
  }, [fetchAirports]);

  const handleStepChange = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      await create({ ...formData, status: "DRAFT" });
      onSuccess();
    } catch (error) {
      console.error("Error saving draft shipment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await create({ ...formData, status: "SUBMITTED" });
      onSuccess();
    } catch (error) {
      console.error("Error creating shipment:", error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Shipment" },
    { number: 2, label: "Cargo" },
    { number: 3, label: "Parties" },
    { number: 4, label: "Flight" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-label">NEW BOOKING</span>
            <h2>Create shipment</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Steps */}
        <div className="modal-steps">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step ${
                step.number === currentStep
                  ? "active"
                  : step.number < currentStep
                  ? "completed"
                  : ""
              }`}
            >
              {step.number < currentStep ? (
                <div className="step-number">✓</div>
              ) : (
                <div className="step-number">{step.number}</div>
              )}
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="modal-content">
          {currentStep === 1 && (
            <ShipmentStep
              data={formData}
              onChange={handleStepChange}
              airports={airports}
            />
          )}
          {currentStep === 2 && (
            <CargoStep data={formData} onChange={handleStepChange} />
          )}
          {currentStep === 3 && (
            <PartiesStep data={formData} onChange={handleStepChange} />
          )}
          {currentStep === 4 && (
            <FlightStep
              data={formData}
              onChange={handleStepChange}
              airports={airports}
            />
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn-cancel"
            onClick={currentStep === 1 ? onClose : handlePrevious}
          >
            {currentStep === 1 ? "Cancel" : <ChevronLeft size={18} />}
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>

          <div className="footer-actions">
            {currentStep > 1 && (
              <button className="btn-save-draft" onClick={handleSaveDraft}>
                Save draft
              </button>
            )}
            {currentStep < 4 ? (
              <button className="btn-continue" onClick={handleNext}>
                Continue →
              </button>
            ) : (
              <button
                className="btn-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit booking"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentModal;
