import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { retrieveTasks } from "../db/crudTodo";
import { db } from "../db/db";

// Async thunk for fetching data
export const fetchTasks = createAsyncThunk("todos/fetchTasks", async () => {
  try {
    const tasks = await retrieveTasks(db);
    return tasks;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    throw error;
  }
});

// Todo slice
const todoSlice = createSlice({
  name: "todos",
  initialState: { tasks: [], filter: "all" }, // Initial state should be a plain object
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.tasks.find((todo) => todo.id === action.payload);
      
    },
    setFilter: (state, action) => {
      state.tasks.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the result of fetchTasks
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { addTodo, toggleTodo, setFilter } = todoSlice.actions;

// Configure store with a callback to fetch initial data
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
  preloadedState: {}, // optional initial state (if needed)
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(fetchTasks); // include async thunk middleware
  },
});
