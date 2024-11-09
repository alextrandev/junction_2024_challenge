// src/pages/JobSearchPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import JobList from './JobList';
import JobModal from './JobModal';

function JobSearchPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Job Search</Typography>
      <SearchBar />
      <JobList />
      <JobModal />
    </Container>
  );
}

export default JobSearchPage;
