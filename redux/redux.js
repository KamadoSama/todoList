import { configureStore, createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        filter: "all",
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, toggleTodo, setFilter } = todoSlice.actions;
export const store = configureStore({
    reducer: todoSlice.reducer,
});