import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseApiUrl = "http://localhost:3001/";
const postsApi = baseApiUrl + "posts";

export const fetchFromApi = createAsyncThunk("example/posts", async () => {
  const res = await axios.get(postsApi);
  return res.data;
});
