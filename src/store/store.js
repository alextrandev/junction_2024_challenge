import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import exampleReducer from "./exampleSlice";
import hashcodeReducer from "./hashcodeSlice";
import jobSeekerReducer from "./jobSeekerSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    company: companyReducer,
    hashes: hashcodeReducer,
    jobSeeker: jobSeekerReducer,
  },
});
