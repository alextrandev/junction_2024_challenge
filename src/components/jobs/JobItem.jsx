// src/components/JobItem.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSelectedJob } from "../../store/jobSlice";

function JobItem({ job }) {
  const dispatch = useDispatch();

  const openJobModal = () => {
    dispatch(setSelectedJob(job));
  };

  return (
    <Card onClick={openJobModal} sx={{ mb: 2, cursor: "pointer" }}>
      <CardContent>
        <Typography variant="h6">{job.jobPosition.title}</Typography>
        <Typography variant="body2">Company: {job.name}</Typography>
        <Typography variant="body2">
          Location: {job.workingConditions.location.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default JobItem;
