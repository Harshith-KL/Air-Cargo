import { useState, useEffect } from "react";
import {
  getDashboardStats,
  getDashboardPipeline,
  getDashboardRecentBookings,
} from "../api/dashboardApi";

export const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export const useDashboardPipeline = () => {
  const [pipeline, setPipeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        setLoading(true);
        const data = await getDashboardPipeline();
        setPipeline(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPipeline(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPipeline();
  }, []);

  return { pipeline, loading, error };
};

export const useDashboardRecentBookings = (status = "All") => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getDashboardRecentBookings(status);
        setBookings(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [status]);

  return { bookings, loading, error };
};
