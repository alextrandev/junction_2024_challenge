// src/components/JobModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedJob } from "../../store/jobSlice";

function JobModal() {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs.selectedJob);

  if (!job) return null;

  return (
    <Dialog >
      <DialogTitle>{job.jobPosition.title}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Company: {job.name}</Typography>
        <Typography>
          Location: {job.workingConditions.location.join(", ")}
        </Typography>
        <Typography>
          Salary: {job.jobPosition.salary.min}-{job.jobPosition.salary.max}{" "}
          {job.jobPosition.salary.currency}
        </Typography>
        <Typography>Benefits: {job.jobPosition.benefits.join(", ")}</Typography>
        <Button onClick={() => dispatch(clearSelectedJob())} sx={{ mt: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default JobModal;
