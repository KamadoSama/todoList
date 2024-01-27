import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { retrieveTasks, insertTask } from "../db/crudTodo";
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

export const addTask = createAsyncThunk("todos/addTask", async (task) => {
  try {
    const result = await insertTask(db, task);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'insertion de la tâche :", error);
    throw error;
  }
});

// Todo slice
const todoSlice = createSlice({
  name: "todos",
  initialState: { tasks: [], filter: "all", searchInput:'' }, // Initial state should be a plain object
  reducers: {
    addTodo: (state, action) => {
      //{type: "todos/addTodo", payload: {id: 1, titre: "My todo",date: "2021-05-05",description: "My description",heureDebut: "12:00",heureFin: "13:00",categorie: "Travail",priorite: "Haute",done:0}}
      
      state.tasks.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.tasks.find((todo) => todo.id === action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the result of fetchTasks
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
    .addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
  },
});

export const { addTodo, toggleTodo, setFilter,setSearchInput } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
