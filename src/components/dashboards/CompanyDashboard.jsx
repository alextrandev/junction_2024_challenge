import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function CompanyDashboard() {
  // Mock data - replace with real data later
  const [recentApplications] = useState([
    { id: 1, name: "John Doe", position: "Software Engineer", status: "New" },
    { id: 2, name: "Jane Smith", position: "UX Designer", status: "Reviewed" },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Product Manager",
      status: "Interviewed",
    },
  ]);

  const [activeJobs] = useState([
    { id: 1, title: "Senior Developer", applicants: 12 },
    { id: 2, title: "UX Designer", applicants: 8 },
    { id: 3, title: "Product Manager", applicants: 15 },
  ]);

  const stats = {
    totalJobs: 5,
    totalApplications: 35,
    activeListings: 3,
    interviewsScheduled: 4,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, Company Name
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's what's happening with your job listings today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Add your stats components here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
