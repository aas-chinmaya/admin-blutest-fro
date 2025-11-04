import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

// ---------- Thunks ----------
export const getEmployeeProjects = createAsyncThunk(
  "employeeDashboard/getEmployeeProjects",
  async () => {
    const res = await axiosInstance.get("/projects/getallprojectswithallteams");
    return res.data || [];
  }
);

export const getProjectDetailsById = createAsyncThunk(
  "employeeDashboard/getProjectDetailsById",
  async (projectId) => {
    const res = await axiosInstance.get(`/projects/getProjectById/${projectId}`);
    return res.data || {};
  }
);

export const getAllTasksWithProjects = createAsyncThunk(
  "employeeDashboard/getAllTasksWithProjects",
  async () => {
    const res = await axiosInstance.get("/projects/projectswithtasks");
    return res.data || [];
  }
);

export const getTasksByDeadline = createAsyncThunk(
  "employeeDashboard/getTasksByDeadline",
  async () => {
    const res = await axiosInstance.get("/task/bydeadline");
    return (res.data.data || []).sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
  }
);

export const getTaskDetailsById = createAsyncThunk(
  "employeeDashboard/getTaskDetailsById",
  async (taskId) => {
    const res = await axiosInstance.get(`/task/getbyid/${taskId}`);
    return res.data || {};
  }
);

// ---------- Initial State ----------
const initialState = {
  projects: { data: [], status: "idle", error: null },
  selectedProject: { data: {}, status: "idle", error: null },
  projectTasks: { data: [], status: "idle", error: null },
  deadlineTasks: { data: [], status: "idle", error: null },
  selectedTask: { data: {}, status: "idle", error: null },
};

// ---------- Slice ----------
const employeeDashboardSlice = createSlice({
  name: "employeeDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeProjects.pending, (s) => {
        s.projects.status = "loading";
      })
      .addCase(getEmployeeProjects.fulfilled, (s, a) => {
        s.projects.status = "succeeded";
        s.projects.data = a.payload;
      })
      .addCase(getEmployeeProjects.rejected, (s, a) => {
        s.projects.status = "failed";
        s.projects.error = a.error.message;
      })
      .addCase(getProjectDetailsById.fulfilled, (s, a) => {
        s.selectedProject.data = a.payload;
      })
      .addCase(getAllTasksWithProjects.fulfilled, (s, a) => {
        s.projectTasks.data = a.payload;
      })
      .addCase(getTasksByDeadline.fulfilled, (s, a) => {
        s.deadlineTasks.data = a.payload;
      })
      .addCase(getTaskDetailsById.fulfilled, (s, a) => {
        s.selectedTask.data = a.payload;
      });
  },
});

export default employeeDashboardSlice.reducer;
