import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setSearchQuery } from "../../store/jobSlice";
import JobCard from "./JobCard";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && jobs.length === 0 && (
        <Typography>No jobs available</Typography>
      )}
      <List>
        {jobs.map((job) => (
          <ListItem key={job.id}>
            <JobCard job={job} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default JobList;
