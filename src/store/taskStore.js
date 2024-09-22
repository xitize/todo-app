import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: state.length + 1,
        title: action.payload.title,
        completed: false
      });
    },
    markTaskToggle: (state, action) => {
      const todo = state.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed; //works as still wrapped in proxy.
      }
    },
    deleteTask: (state, action) => {
      // console.log("id: " + action.payload.id);
      // state.splice(action.payload.id - 1, 1);
      return state.filter((item) => item.id !== action.payload.id);
    },
    isEditable: (state, action) => {
      const todo = state.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.editable = action.payload.editable; //works as still wrapped in proxy.
      }
    },
    saveTask: (state, action) => {
      const todo = state.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title; //works as still wrapped in proxy.
      }
    }
  }
});

export const { addTask, markTaskToggle, deleteTask, isEditable, saveTask } =
  taskSlice.actions;
export const taskReducer = taskSlice.reducer;
