import { useState, useCallback } from "react";
import {
  getAllShipments,
  createShipment,
  updateShipment,
  deleteShipment,
  getAirports,
} from "../api/shipmentApi";

export const useShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchShipments = useCallback(async (filters = {}, page = 1, limit = 12) => {
    try {
      setLoading(true);
      const data = await getAllShipments(filters, page, limit);
      setShipments(Array.isArray(data.shipments) ? data.shipments : []);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err.message);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { shipments, loading, error, totalPages, fetchShipments };
};

export const useCreateShipment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (data) => {
    try {
      setLoading(true);
      const result = await createShipment(data);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useUpdateShipment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = useCallback(async (id, data) => {
    try {
      setLoading(true);
      const result = await updateShipment(id, data);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useDeleteShipment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = useCallback(async (id) => {
    try {
      setLoading(true);
      await deleteShipment(id);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};

export const useAirports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAirports();
      console.log("Airports API Response:", data);
console.log("Is Array:", Array.isArray(data));
      setAirports(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAirports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { airports, loading, error, fetchAirports };
};
