import {
  BusinessCenter as BusinessIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { safeAccess, safeRender } from "../../lib/utils";

export default function JobSeekerDashboard() {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#2196f3"; // Blue
      case "Reviewed":
        return "#ff9800"; // Orange
      case "Interviewed":
        return "#4caf50"; // Green
      default:
        return "#757575"; // Grey
    }
  };

  const renderProfileSection = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Work Styles
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentCompany, "workStyles", []),
            (style, index) => (
              <ListItem key={index}>
                <ListItemText primary={style} />
              </ListItem>
            )
          )}
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Values
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentCompany, "values", []),
            (value, index) => (
              <ListItem key={index}>
                <ListItemText primary={value} />
              </ListItem>
            )
          )}
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Working Conditions
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentCompany, "workingConditions.flexibility", []),
            (flex, index) => (
              <ListItem key={index}>
                <ListItemText primary={flex} />
              </ListItem>
            )
          )}
        </List>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
          Location Options
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentCompany, "workingConditions.location", []),
            (loc, index) => (
              <ListItem key={index}>
                <ListItemText primary={loc} />
              </ListItem>
            )
          )}
        </List>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, Job Seeker
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's what's happening with your job applications today.
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
            <WorkIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.totalJobs}</Typography>
            <Typography color="text.secondary">Total Jobs</Typography>
          </Paper>
        </Grid>

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
            <PersonIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.totalApplications}</Typography>
            <Typography color="text.secondary">Total Applications</Typography>
          </Paper>
        </Grid>

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
            <BusinessIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.activeListings}</Typography>
            <Typography color="text.secondary">Active Listings</Typography>
          </Paper>
        </Grid>

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
            <ScheduleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.interviewsScheduled}</Typography>
            <Typography color="text.secondary">Interviews Scheduled</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Active Jobs and Recent Applications */}
      <Grid container spacing={3}>
        {/* Active Jobs */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Active Job Applications</Typography>
                <Button variant="contained" color="primary">
                  Apply for New Job
                </Button>
              </Box>
              <List>
                {activeJobs.map((job) => (
                  <Box key={job.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={job.title}
                        secondary={`${job.applicants} applicants`}
                      />
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Job Applications
              </Typography>
              <List>
                {recentApplications.map((application) => (
                  <Box key={application.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={application.name}
                        secondary={
                          <Box
                            component="span"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {application.position}
                            <Box
                              component="span"
                              sx={{
                                display: "inline-block",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: `${getStatusColor(
                                  application.status
                                )}15`,
                                color: getStatusColor(application.status),
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                              }}
                            >
                              {application.status}
                            </Box>
                          </Box>
                        }
                      />
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
