import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

// ---------- Thunks ----------
export const getAllClients = createAsyncThunk(
  "cpcDashboard/getAllClients",
  async () => {
    const res = await axiosInstance.get("/client/getAllClients");
    return {
      clients: res.data.clients || [],
      total: res.data.totalClients || 0,
    };
  }
);

export const getClientInsights = createAsyncThunk(
  "cpcDashboard/getClientInsights",
  async () => {
    const res = await axiosInstance.get("/client/insights");
    return {
      stats: res.data || {},
      active: res.data.clientsWithInProgressProjects?.total || 0,
      new: res.data.clientsOnboardedLast3Months?.total || 0,
    };
  }
);

export const getProjectActivitySummary = createAsyncThunk(
  "cpcDashboard/getProjectActivitySummary",
  async () => {
    const res = await axiosInstance.get("/projects/near-ending");
    return (res.data.projects || []).map((p) => ({
      id: p.projectId,
      name: p.projectName,
      category: p.category,
      endDate: p.endDate,
      teamLead: p.teamLeadName || "Unknown",
      daysRemaining: p.endDate
        ? Math.ceil((new Date(p.endDate) - new Date()) / (1000 * 60 * 60 * 24))
        : 0,
    }));
  }
);

// ---------- Initial State ----------
const initialState = {
  clients: { data: [], total: 0, status: "idle", error: null },
  insights: { data: {}, active: 0, new: 0, status: "idle", error: null },
  activities: { data: [], status: "idle", error: null },
};

// ---------- Slice ----------
const cpcDashboardSlice = createSlice({
  name: "cpcDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Clients
      .addCase(getAllClients.pending, (s) => {
        s.clients.status = "loading";
      })
      .addCase(getAllClients.fulfilled, (s, a) => {
        s.clients.status = "succeeded";
        s.clients.data = a.payload.clients;
        s.clients.total = a.payload.total;
      })
      .addCase(getAllClients.rejected, (s, a) => {
        s.clients.status = "failed";
        s.clients.error = a.error.message;
      })
      // Insights
      .addCase(getClientInsights.pending, (s) => {
        s.insights.status = "loading";
      })
      .addCase(getClientInsights.fulfilled, (s, a) => {
        s.insights.status = "succeeded";
        s.insights.data = a.payload.stats;
        s.insights.active = a.payload.active;
        s.insights.new = a.payload.new;
      })
      .addCase(getClientInsights.rejected, (s, a) => {
        s.insights.status = "failed";
        s.insights.error = a.error.message;
      })
      // Project Activity Summary
      .addCase(getProjectActivitySummary.pending, (s) => {
        s.activities.status = "loading";
      })
      .addCase(getProjectActivitySummary.fulfilled, (s, a) => {
        s.activities.status = "succeeded";
        s.activities.data = a.payload;
      })
      .addCase(getProjectActivitySummary.rejected, (s, a) => {
        s.activities.status = "failed";
        s.activities.error = a.error.message;
      });
  },
});

export default cpcDashboardSlice.reducer;
