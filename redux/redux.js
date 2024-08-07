import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { retrieveTasks, insertTask, deleteTask, updateTask, retrieveUser } from "../db/crudTodo";
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

export const removeTask = createAsyncThunk("todos/deleteTask", async (id) => {
  try {
    const result = await deleteTask(db, id);
    return result;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    throw error;
  }
});

export const doneTask = createAsyncThunk("todos/updateTask", async (id) => {
  try {
    const result = await updateTask(db, id);
    return result;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    throw error;
  }
});


const fectUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const user = await retrieveUser(db);
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
})


// Todo slice
const todoSlice = createSlice({
  name: "todos",
  initialState: { tasks: [], filter: "all", searchInput: "" }, // Initial state should be a plain object
  reducers: {
    addTodo: (state, action) => {
      //{type: "todos/addTodo", payload: {id: 1, titre: "My todo",date: "2021-05-05",description: "My description",heureDebut: "12:00",heureFin: "13:00",priorite: "Haute",done:0}}

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
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(doneTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, done: 1 };
          } else {
            return task;
          }
        });
      });
  },
});


// les informations de l'utilisateur

const userSlice =  createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fectUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  }
});


export const { addTodo, toggleTodo, setFilter, setSearchInput } =
  todoSlice.actions;

export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    user: userSlice.reducer,
  },
});
