import {
    Work as WorkIcon,
    School as SchoolIcon,
    ThumbUp as ThumbUpIcon,
    Person as PersonIcon,
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
  
  export default function EmployeeDashboard() {
    const [jobRecommendations] = useState([
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "Remote",
        matchPercentage: 85,
      },
      {
        id: 2,
        title: "Data Analyst",
        company: "FinCorp",
        location: "New York, NY",
        matchPercentage: 90,
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "Creative Agency",
        location: "San Francisco, CA",
        matchPercentage: 78,
      },
    ]);
  
    const [applications] = useState([
      {
        id: 1,
        position: "Backend Developer",
        company: "WebWorks",
        status: "Interview Scheduled",
      },
      {
        id: 2,
        position: "Data Scientist",
        company: "DataWiz",
        status: "In Progress",
      },
      {
        id: 3,
        position: "Project Manager",
        company: "InnovaTech",
        status: "Consider for Future",
      },
    ]);
  
    const [resources] = useState([
      {
        id: 1,
        title: "Advanced JavaScript Course",
        platform: "Udemy",
        link: "#",
      },
      {
        id: 2,
        title: "Data Analysis with Python",
        platform: "Coursera",
        link: "#",
      },
      {
        id: 3,
        title: "Project Management Basics",
        platform: "LinkedIn Learning",
        link: "#",
      },
    ]);
  
    const userInfo = {
      name: "Alex Johnson",
      currentRole: "Junior Developer",
      skills: ["JavaScript", "React", "Python", "SQL"],
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case "Interview Scheduled":
          return "#4caf50"; // Green
        case "In Progress":
          return "#2196f3"; // Blue
        case "Consider for Future":
          return "#f44336"; // Red
        default:
          return "#757575"; // Grey
      }
    };
  
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {userInfo.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Your personalized dashboard for job opportunities and application
            updates.
          </Typography>
        </Box>
  
        {/* Profile Overview */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">{userInfo.name}</Typography>
              <Typography color="text.secondary">
                Current Role: {userInfo.currentRole}
              </Typography>
              <Typography color="text.secondary">
                Skills: {userInfo.skills.join(", ")}
              </Typography>
            </Box>
          </Box>
        </Paper>
  
        <Grid container spacing={3}>
          {/* Job Recommendations */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Job Recommendations
                </Typography>
                <List>
                  {jobRecommendations.map((job) => (
                    <Box key={job.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "secondary.main" }}>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={job.title}
                          secondary={`${job.company} - ${job.location}`}
                        />
                        <Box
                          sx={{
                            ml: 2,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: "primary.light",
                            color: "primary.contrastText",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                          }}
                        >
                          {job.matchPercentage}% Match
                        </Box>
                        <Button variant="outlined" size="small" sx={{ ml: 2 }}>
                          Apply Now
                        </Button>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Applications Status */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Applications Status
                </Typography>
                <List>
                  {applications.map((application) => (
                    <Box key={application.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{ bgcolor: getStatusColor(application.status) }}
                          >
                            <ThumbUpIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={application.position}
                          secondary={`${application.company} - ${application.status}`}
                        />
                        <Box
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: `${getStatusColor(application.status)}15`,
                            color: getStatusColor(application.status),
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {application.status}
                        </Box>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Skill Development Resources */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skill Development Resources
                </Typography>
                <List>
                  {resources.map((resource) => (
                    <Box key={resource.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "secondary.main" }}>
                            <SchoolIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={resource.title}
                          secondary={`Platform: ${resource.platform}`}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          href={resource.link}
                          target="_blank"
                        >
                          View Course
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
  