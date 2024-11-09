import {
  Edit as EditIcon,
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
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobSeekers } from '../../store/jobSeekerSlice';
import { useNavigate } from "react-router-dom";
import { safeAccess, safeRender } from "../../utils/helperFunctions";
import JobSeekerCultureDialog from "../dialogs/JobSeekerCultureDialog";
import JobSeekerProfileEditDialog from "../dialogs/JobSeekerProfileDialog";

export default function JobSeekerDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentJobSeeker, status, error, stats } = useSelector(
    (state) => state.jobSeeker
  );
  const [editDialogs, setEditDialogs] = useState({
    profile: false,
    culture: false,
    jobPosition: false,
  });
  const [editData, setEditData] = useState({});

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

  useEffect(() => {
    dispatch(fetchJobSeekers());
  }, [dispatch]);

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
    <Container container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Bio
        </Typography>
        <List dense style={{ width: "700px" }}>
          <ListItem>
            <ListItemText
              primary={"Headline"}
              secondary={currentJobSeeker?.headline ?? null}
            />
            <ListItemText
              primary={"Experience"}
              secondary={currentJobSeeker?.experience ?? null}
            />
            <ListItemText
              primary={"Distance"}
              secondary={currentJobSeeker.distance ?? null}
            />
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Skills
        </Typography>
        <List dense style={{ display: "flex" }}>
          {safeRender(
            safeAccess(currentJobSeeker, "skills", []),
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
          Experiences
        </Typography>
        <Container maxWidth="xl">
          {safeRender(safeAccess(currentJobSeeker, "positionHistory", []), (position, index) => (
            <List key={index} dense style={{ display: 'flex', flexDirection: 'row', width: "1000px" }}>
              <ListItem>
                <ListItemText
                  primary={"Position"}
                  secondary={position.position}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"Company"}
                  secondary={position.company}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"Duration"}
                  secondary={position.duration}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"Skills"}
                  secondary={safeAccess(position, "skills", []).join(", ")}
                />
              </ListItem>
            </List>
          ))}
        </Container>
      </Grid>
    </Container>
  );

  const renderWorkCultureSection = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Work Styles
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentJobSeeker, "workStyles", []),
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
            safeAccess(currentJobSeeker, "values", []),
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
          Work culture
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary={currentJobSeeker.workingConditions.culture ?? null} />
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Working flexibility
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentJobSeeker, "workingConditions.flexibility", []),
            (flex, index) => (
              <ListItem key={index}>
                <ListItemText primary={flex} />
              </ListItem>
            )
          )}
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          Benefit expectations
        </Typography>
        <List dense>
          {safeRender(
            safeAccess(currentJobSeeker, "workingConditions.benefitExpectations", []),
            (flex, index) => (
              <ListItem key={index}>
                <ListItemText primary={flex} />
              </ListItem>
            )
          )}
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
          Preferred Work Location
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary={currentJobSeeker.workingConditions.location.preferred ?? null} />
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
          Accepted Work Location
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary={"Preferred"}
              secondary={currentJobSeeker.workingConditions.location.preferred ?? null}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Acceptance"}
              secondary={safeAccess(currentJobSeeker, "workingConditions.location.acceptance", []).join(", ")}
            />
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
          Salary expectations
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary={"Min"}
              secondary={currentJobSeeker.workingConditions.salaryExpectations.min}
            />
            <ListItemText
              primary={"Max"}
              secondary={currentJobSeeker.workingConditions.salaryExpectations.max}
            />
            <ListItemText
              primary={"Currency"}
              secondary={currentJobSeeker.workingConditions.salaryExpectations.currency}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );

  if (status === "loading" || !currentJobSeeker) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h6">Loading job seekers data...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </Box>
      </Container>
    );
  }

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

      {/* dialogs / forms to edit data */}
      <JobSeekerProfileEditDialog
        open={editDialogs.profile}
        onClose={() => setEditDialogs((prev) => ({ ...prev, profile: false }))}
      />
      {/* this one missing the edit / add Experiences */}

      <JobSeekerCultureDialog
        open={editDialogs.culture}
        onClose={() => setEditDialogs((prev) => ({ ...prev, culture: false }))}
      />

      {/* Profile Section with edit button*/}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Job search profile</Typography>
                <IconButton
                  onClick={() => {
                    setEditDialogs((prev) => {
                      const newState = { ...prev, profile: true };
                      return newState;
                    });
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              {renderProfileSection()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Expected Work Culture</Typography>
                <IconButton
                  onClick={() => {
                    console.log("Opening culture dialog");
                    setEditDialogs((prev) => {
                      const newState = { ...prev, culture: true };
                      console.log("New dialog state:", newState);
                      return newState;
                    });
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              {renderWorkCultureSection()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/jobseeker/match`)}
                      >
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
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/jobseeker/match`)}
                      >
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