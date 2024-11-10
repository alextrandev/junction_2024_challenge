import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, submitApplication } from "../../store/applicationSlice";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  TextareaAutosize,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const JobApplicationForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  // Provide a default value (empty object) to avoid reading from undefined
  const {
    form = {},
    loading,
    success,
    error,
  } = useSelector((state) => state.company);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    dispatch(updateForm({ [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create job seeker data structure from form values
    const jobSeekerData = {
      headline: "Job Applicant",
      skills: [form.position], // Or other dynamic skills as per the form
      experience: form.experience || "3+ years",
      distance: form.distance || "20 km",
      ...form, // Add any other form fields
    };

    // Dispatch the submitApplication thunk with jobSeekerData
    dispatch(submitApplication(jobSeekerData));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 768,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Job Application Form
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email || ""}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone || ""}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        <Grid size={6}>
          <TextField
            select
            fullWidth
            label="Position"
            name="position"
            value={form.position || ""}
            onChange={handleChange}
            variant="outlined"
            required
          >
            <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
            <MenuItem value="Backend Developer">Backend Developer</MenuItem>
            <MenuItem value="Full Stack Developer">
              Full Stack Developer
            </MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
          </TextField>
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Years of Experience"
            name="experience"
            type="number"
            value={form.experience || ""}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            name="resume"
            type="file"
            onChange={handleChange}
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={12}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="Tell us about yourself"
            style={{ width: "100%" }}
            name="description"
            fullWidth
            type="file"
            onChange={handleChange}
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Application"}
          </Button>
        </Grid>
        <Grid size={4}>
          <Button
            type="submit"
            variant="outlined"
            color="error"
            fullWidth
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            {loading ? <CircularProgress size={24} /> : "Cancel"}
          </Button>
        </Grid>

        {success && (
          <Grid size={8}>
            <Typography color="green">
              Application submitted successfully!
            </Typography>
          </Grid>
        )}

        {error && (
          <Grid size={8}>
            <Typography color="red">Error: {error}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default JobApplicationForm;
