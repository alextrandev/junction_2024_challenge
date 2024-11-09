import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import exampleReducer from "./exampleSlice";
import jobSeekerReducer from "./jobSeekerSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    company: companyReducer,
    jobSeeker: jobSeekerReducer,
  },
});
