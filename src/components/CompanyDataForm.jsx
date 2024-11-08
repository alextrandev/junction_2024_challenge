import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function CompanyDataForm() {
  const [formData, setFormData] = useState({
    name: "",
    history: "",
    businessId: "",
    workStyles: "",
    values: "",
    flexibility: "",
    location: "",
    workplaceCulture: "",
    mentalHealthSupport: "",
    jobPosition: "",
    salary: "",
    benefits: "",
    requiredSkills: "",
    requiredExperience: "",
    rating: 0,
    postcode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const flexibilityOptions = ["Remote", "Hybrid", "On-site", "Flexible hours"];

  return (
    <Paper elevation={3} className="tw-max-w-4xl tw-mx-auto tw-my-8">
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
        >
          Company Information Form
        </Typography>

        <Grid container spacing={3}>
          {/* Basic Information Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Business ID"
              name="businessId"
              value={formData.businessId}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company History"
              name="history"
              value={formData.history}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>

          {/* Working Conditions Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ mb: 2, mt: 2, color: "text.secondary" }}
            >
              Working Conditions
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Flexibility Options"
              name="flexibility"
              value={formData.flexibility}
              onChange={handleChange}
            >
              {flexibilityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Workplace Culture"
              name="workplaceCulture"
              value={formData.workplaceCulture}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mental Health Support"
              name="mentalHealthSupport"
              value={formData.mentalHealthSupport}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          {/* Job Details Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ mb: 2, mt: 2, color: "text.secondary" }}
            >
              Job Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Job Position"
              name="jobPosition"
              value={formData.jobPosition}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          {/* Selection Criteria Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ mb: 2, mt: 2, color: "text.secondary" }}
            >
              Selection Criteria
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Required Skills"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Required Experience"
              name="requiredExperience"
              value={formData.requiredExperience}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography component="legend">Company Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                size="large"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                height: 48,
                fontSize: "1.1rem",
              }}
            >
              Submit Company Information
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
