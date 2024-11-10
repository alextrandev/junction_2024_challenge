import {
  Edit as EditIcon,
  Person as PersonIcon,
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
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, updateStats } from "../../store/companySlice";
import CultureEditDialog from "../dialogs/CultureEditDialog";
import ProfileEditDialog from "../dialogs/ProfileEditDialog";
import { useNavigate } from "react-router-dom";
import { safeAccess, safeRender } from "../../utils/helperFunctions";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCompany, status, error, stats } = useSelector(
    (state) => state.company
  );
  const [editDialogs, setEditDialogs] = useState({
    profile: false,
    culture: false,
    jobPosition: false,
  });
  const [editData, setEditData] = useState({});

  // Calculate active jobs from currentCompany data
  const activeJobs = useMemo(() => {
    if (!currentCompany?.jobPosition) return [];
    // Convert single job position to array format for rendering
    return [
      {
        id: 1,
        title: currentCompany.jobPosition.title,
        applicants: 0, // You might want to track this in your data model
        salary: currentCompany.jobPosition.salary,
        benefits: currentCompany.jobPosition.benefits,
        selectionCriteria: currentCompany.jobPosition.selectionCriteria,
      },
    ];
  }, [currentCompany]);

  // Calculate recent applications (this should come from your backend)
  const recentApplications = useMemo(() => {
    return []; // This should be populated from your backend when you implement that feature
  }, []);

  // this branch use mock data
  // useEffect(() => {
  //   dispatch(fetchCompanies());
  // }, [dispatch]);

  // Update stats based on actual data
  useEffect(() => {
    const calculatedStats = {
      totalJobs: activeJobs.length,
      totalApplications: recentApplications.length,
      activeListings: activeJobs.length,
      interviewsScheduled: recentApplications.filter(
        (app) => app.status === "Interviewed"
      ).length,
    };
    dispatch(updateStats(calculatedStats));
  }, [activeJobs, recentApplications, dispatch]);

  // Company Culture Section
  const renderCultureSection = () => (
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

  // Stats Section
  const renderStatsSection = () => (
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
          <Typography variant="h4">{stats?.totalJobs || 0}</Typography>
          <Typography color="text.secondary">Total Jobs</Typography>
        </Paper>
      </Grid>
      {/* ... other stat cards with similar pattern ... */}
    </Grid>
  );

  // Job Position Section
  const renderJobPosition = () =>
    currentCompany?.jobPosition && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            {safeAccess(currentCompany, "jobPosition.title")}
          </Typography>
          <Typography variant="body1">
            Salary Range: {safeAccess(currentCompany, "jobPosition.salary.min")}
            -{safeAccess(currentCompany, "jobPosition.salary.max")}{" "}
            {safeAccess(currentCompany, "jobPosition.salary.currency")}
          </Typography>
          {/* ... rest of job position rendering ... */}
        </Grid>
      </Grid>
    );

  if (status === "loading" || !currentCompany) {
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
          <Typography variant="h6">Loading company data...</Typography>
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
      {/* Welcome Section with Edit Button */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h2" gutterBottom>
            Welcome back, {currentCompany?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {currentCompany?.history}
          </Typography>
        </Box>
        <IconButton
          onClick={() => setEditDialogs((prev) => ({ ...prev, profile: true }))}
        >
          <EditIcon />
        </IconButton>
      </Box>

      <ProfileEditDialog
        open={editDialogs.profile}
        onClose={() => setEditDialogs((prev) => ({ ...prev, profile: false }))}
      />

      <CultureEditDialog
        open={editDialogs.culture}
        onClose={() => setEditDialogs((prev) => ({ ...prev, culture: false }))}
      />

      {/* Company Culture Section with Edit Button */}
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
                <Typography variant="h6">Company Culture</Typography>
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
              {renderCultureSection()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Current Job Position Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Current Job Opening</Typography>
                <Button variant="contained" color="primary">
                  Edit Position
                </Button>
              </Box>
              {renderJobPosition()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Stats Cards */}
      {renderStatsSection()}

      {/* Active Jobs Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Active Job Listings</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setEditDialogs((prev) => ({ ...prev, jobPosition: true }))
                  }
                >
                  {activeJobs.length > 0 ? "Edit Position" : "Post New Job"}
                </Button>
              </Box>
              {activeJobs.length > 0 ? (
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
                          secondary={
                            <>
                              {`Salary: ${job.salary.min}-${job.salary.max} ${job.salary.currency}`}
                              <br />
                              {`${job.applicants} applicants`}
                            </>
                          }
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/company/match`)}
                        >
                          View Details
                        </Button>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              ) : (
                <Typography
                  color="text.secondary"
                  align="center"
                  sx={{ py: 3 }}
                >
                  No active job listings. Click 'Post New Job' to create one.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Applications Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Applications
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
                        Review
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
