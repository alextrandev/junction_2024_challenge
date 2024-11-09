// src/components/SearchBar.js
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/jobSlice";
import { TextField } from "@mui/material";

function SearchBar() {
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div
      className="searchBar"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search Jobs"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        style={{
          maxWidth: "300px",
          minWidth: "250px",
        }}
      />
    </div>
  );
}

export default SearchBar;
