import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import exampleReducer from "./exampleSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    company: companyReducer,
  },
});
