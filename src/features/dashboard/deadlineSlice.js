import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/lib/axios';

/* -----------------------------------------------
   FETCH TASKS BY DEADLINE - CPC VIEW
-------------------------------------------------*/
export const fetchCpcTasksByDeadline = createAsyncThunk(
  'deadline/fetchCpcTasksByDeadline',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/task/bydeadline/cpc');
      const tasks = response.data?.data || [];
      const sortedTasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      return sortedTasks;
    } catch (error) {
      console.error('fetchCpcTasksByDeadline error:', error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch CPC deadline tasks');
    }
  }
);

/* -----------------------------------------------
   FETCH TASKS BY DEADLINE - EMPLOYEE VIEW
-------------------------------------------------*/
export const fetchEmployeeTasksByDeadline = createAsyncThunk(
  'deadline/fetchEmployeeTasksByDeadline',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/task/bydeadline/employee/${employeeId}`);
      const tasks = response.data?.data || [];
      const sortedTasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      return sortedTasks;
    } catch (error) {
      console.error('fetchEmployeeTasksByDeadline error:', error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch Employee deadline tasks');
    }
  }
);

/* -----------------------------------------------
   SLICE DEFINITION
-------------------------------------------------*/
const deadlineSlice = createSlice({
  name: 'deadline',
  initialState: {
    cpc: {
      tasks: [],
      loading: false,
      error: null,
    },
    employee: {
      tasks: [],
      loading: false,
      error: null,
    },
  },
  reducers: {},

  extraReducers: (builder) => {
    /* CPC DEADLINE TASKS */
    builder
      .addCase(fetchCpcTasksByDeadline.pending, (state) => {
        state.cpc.loading = true;
        state.cpc.error = null;
      })
      .addCase(fetchCpcTasksByDeadline.fulfilled, (state, action) => {
        state.cpc.loading = false;
        state.cpc.tasks = action.payload;
      })
      .addCase(fetchCpcTasksByDeadline.rejected, (state, action) => {
        state.cpc.loading = false;
        state.cpc.error = action.payload;
      });

    /* EMPLOYEE DEADLINE TASKS */
    builder
      .addCase(fetchEmployeeTasksByDeadline.pending, (state) => {
        state.employee.loading = true;
        state.employee.error = null;
      })
      .addCase(fetchEmployeeTasksByDeadline.fulfilled, (state, action) => {
        state.employee.loading = false;
        state.employee.tasks = action.payload;
      })
      .addCase(fetchEmployeeTasksByDeadline.rejected, (state, action) => {
        state.employee.loading = false;
        state.employee.error = action.payload;
      });
  },
});

export default deadlineSlice.reducer;
