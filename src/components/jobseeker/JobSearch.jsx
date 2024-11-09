import React from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import SearchBar from "../jobs/SearchBar";
import JobList from "../jobs/JobList";

const Jobs = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
          Job Search
        </Typography>
        <SearchBar />
        <JobList />
      </Box>
    </Container>
  );
};

export default Jobs;
