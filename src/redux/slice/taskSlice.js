import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utills/api";

// Create a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      const response = await axios.post(`${BASE_URL}/tasks`, taskData, {
        headers: { 'x-auth-token': login.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to add Task');
    }
  }
);

// Get all tasks for the logged-in user
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTask',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      if (!login.token) {
        console.log('No token found');
      }
      const response = await axios.get(`${BASE_URL}/tasks`, {
        headers: { 'x-auth-token': login.token },
      });
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to fetch tasks');
    }
  }
);

// Get a specific task
export const fetchSpecificTask = createAsyncThunk(
  'tasks/specificTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      const response = await axios.get(`${BASE_URL}/tasks/${taskId}`, {
        headers: { 'x-auth-token': login.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to fetch task');
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      const response = await axios.put(`${BASE_URL}/tasks/${taskData.id}`, taskData, {
        headers: { 'x-auth-token': login.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to update task');
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
        headers: { 'x-auth-token': login.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to delete task');
    }
  }
);

// Delete all tasks
export const deleteAllTask = createAsyncThunk(
  'tasks/deleteAllTask',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      const response = await axios.delete(`${BASE_URL}/tasks`, {
        headers: { 'x-auth-token': login.token },
      });
      return response.data;
    } catch (error) {
      console.log("ERROR IS", error);
      return rejectWithValue(error?.response?.data || 'Failed to delete all tasks');
    }
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, action.payload];
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch specific task
      .addCase(fetchSpecificTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(fetchSpecificTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete all tasks
      .addCase(deleteAllTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.tasks = [];
        }
      })
      .addCase(deleteAllTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;