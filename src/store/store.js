import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./taskStore";

export default configureStore({ reducer: taskReducer });
