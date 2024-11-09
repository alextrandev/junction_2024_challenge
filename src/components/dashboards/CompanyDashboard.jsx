import {
  BusinessCenter as BusinessIcon,
  Edit as EditIcon,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function CompanyDashboard() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogs, setEditDialogs] = useState({
    profile: false,
    culture: false,
    jobPosition: false,
  });
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("http://localhost:3001/Company");
        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }
        const data = await response.json();
        setCompanyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

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

  const handleSave = async (section) => {
    try {
      const updatedData = {
        ...companyData,
        ...editData,
      };

      const response = await fetch("http://localhost:3001/Company", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update data");

      setCompanyData(updatedData);
      handleCloseDialog(section);
    } catch (err) {
      setError(err.message);
      console.error("Error saving data:", err);
    }
  };

  const handleCloseDialog = (section) => {
    setEditDialogs((prev) => ({ ...prev, [section]: false }));
    setEditData({});
  };

  const ProfileEditDialog = () => (
    <Dialog
      open={editDialogs.profile}
      onClose={() => handleCloseDialog("profile")}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Company Profile</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Company Name"
          defaultValue={companyData?.name}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, name: e.target.value }))
          }
          sx={{ mt: 2, mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Company History"
          defaultValue={companyData?.history}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, history: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog("profile")}>Cancel</Button>
        <Button onClick={() => handleSave("profile")} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Add Culture Edit Dialog
  const CultureEditDialog = () => {
    // Add local state to track form values
    const [localEditData, setLocalEditData] = useState({
      workStyles: companyData?.workStyles?.join(", ") || "",
      values: companyData?.values?.join(", ") || "",
      workingConditions: {
        flexibility:
          companyData?.workingConditions?.flexibility?.join(", ") || "",
        location: companyData?.workingConditions?.location?.join(", ") || "",
      },
    });

    // Handle local changes
    const handleChange = (field, value) => {
      setLocalEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    // Handle working conditions changes
    const handleWorkingConditionsChange = (field, value) => {
      setLocalEditData((prev) => ({
        ...prev,
        workingConditions: {
          ...prev.workingConditions,
          [field]: value,
        },
      }));
    };

    // Handle save
    const handleSaveClick = () => {
      // Convert comma-separated strings back to arrays
      const formattedData = {
        workStyles: localEditData.workStyles
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        values: localEditData.values
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        workingConditions: {
          flexibility: localEditData.workingConditions.flexibility
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          location: localEditData.workingConditions.location
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
      };

      setEditData(formattedData);
      handleSave("culture");
    };

    return (
      <Dialog
        open={editDialogs.culture}
        onClose={() => handleCloseDialog("culture")}
        maxWidth="md"
        fullWidth
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Edit Company Culture</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Work Styles (comma-separated)"
              fullWidth
              value={localEditData.workStyles}
              onChange={(e) => handleChange("workStyles", e.target.value)}
              helperText="Enter work styles separated by commas"
              onClick={(e) => e.stopPropagation()}
            />

            <TextField
              label="Values (comma-separated)"
              fullWidth
              value={localEditData.values}
              onChange={(e) => handleChange("values", e.target.value)}
              helperText="Enter company values separated by commas"
              onClick={(e) => e.stopPropagation()}
            />

            <TextField
              label="Working Conditions - Flexibility (comma-separated)"
              fullWidth
              value={localEditData.workingConditions.flexibility}
              onChange={(e) =>
                handleWorkingConditionsChange("flexibility", e.target.value)
              }
              helperText="Enter flexibility options separated by commas"
              onClick={(e) => e.stopPropagation()}
            />

            <TextField
              label="Working Conditions - Location (comma-separated)"
              fullWidth
              value={localEditData.workingConditions.location}
              onChange={(e) =>
                handleWorkingConditionsChange("location", e.target.value)
              }
              helperText="Enter location options separated by commas"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog("culture")}>Cancel</Button>
          <Button onClick={handleSaveClick} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading company data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">Error: {error}</Typography>
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
          <Typography variant="h4" gutterBottom>
            Welcome back, {companyData?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {companyData?.history}
          </Typography>
        </Box>
        <IconButton
          onClick={() => setEditDialogs((prev) => ({ ...prev, profile: true }))}
        >
          <EditIcon />
        </IconButton>
      </Box>

      {/* Add the dialog */}
      <ProfileEditDialog />
      <CultureEditDialog />

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
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Work Styles
                  </Typography>
                  <List dense>
                    {companyData?.workStyles.map((style, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={style} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Values
                  </Typography>
                  <List dense>
                    {companyData?.values.map((value, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={value} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Working Conditions
                  </Typography>
                  <List dense>
                    {companyData?.workingConditions.flexibility.map(
                      (flex, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={flex} />
                        </ListItem>
                      )
                    )}
                  </List>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                  >
                    Location Options
                  </Typography>
                  <List dense>
                    {companyData?.workingConditions.location.map(
                      (loc, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={loc} />
                        </ListItem>
                      )
                    )}
                  </List>
                </Grid>
              </Grid>
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {companyData?.jobPosition.title}
                  </Typography>
                  <Typography variant="body1">
                    Salary Range: {companyData?.jobPosition.salary.min}-
                    {companyData?.jobPosition.salary.max}{" "}
                    {companyData?.jobPosition.salary.currency}
                  </Typography>
                  {/* Add Selection Criteria */}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                  >
                    Required Skills
                  </Typography>
                  <List dense>
                    {companyData?.jobPosition.selectionCriteria.skills.map(
                      (skill, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={skill} />
                        </ListItem>
                      )
                    )}
                  </List>
                  <Typography variant="body1">
                    Experience:{" "}
                    {companyData?.jobPosition.selectionCriteria.experience}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Benefits
                  </Typography>
                  <List dense>
                    {companyData?.jobPosition.benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
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
                <Typography variant="h6">Active Job Listings</Typography>
                <Button variant="contained" color="primary">
                  Post New Job
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
