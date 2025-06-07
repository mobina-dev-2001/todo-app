import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: crypto.randomUUID(),
        label: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, label: action.payload.newLabel }
          : todo
      );
    },
    toggleStatus: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleStatus,
  clearCompleted,
  reorderTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
