// src/components/SearchBar.js
import React from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/jobSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <TextField
      label="Search Jobs"
      variant="outlined"
      fullWidth
      onChange={handleSearchChange}
      sx={{ mb: 2 }}
    />
  );
}

export default SearchBar;
