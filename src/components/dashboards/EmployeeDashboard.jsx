import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Work as WorkIcon, Person as PersonIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const [reviews] = useState([
    {
      id: 1,
      companyId: 101,
      companyName: "Tech Solutions Inc.",
      reviewType: "Past Review",
      rating: 4.5,
      comment: "Great company culture, but work-life balance could improve.",
      date: "2023-07-15",
    },
    {
      id: 2,
      companyId: 101,
      companyName: "Tech Solutions Inc.",
      reviewType: "Recent Review",
      rating: 4.2,
      comment:
        "Good environment, supportive team, but high pressure on deadlines.",
      date: "2024-03-20",
    },
    {
      id: 3,
      companyId: 101,
      companyName: "Tech Solutions Inc.",
      reviewType: "Upcoming Review",
      rating: null,
      comment: "Looking forward to sharing my experience after one year.",
      date: "2024-12-01",
    },
  ]);

  const userInfo = {
    name: "Alex Johnson",
    currentRole: "Junior Developer",
    skills: ["JavaScript", "React", "Python", "SQL"],
    currentCompany: "Tech Solutions Inc.", // Employee's current company
    currentCompanyId: 101, // ID of the current company
  };

  // Filter reviews by the current company
  const currentCompanyReviews = reviews.filter(
    (review) => review.companyId === userInfo.currentCompanyId
  );

  // Find the upcoming review or check if there's no review for the current company
  const upcomingReview = currentCompanyReviews.find(
    (review) => review.reviewType === "Upcoming Review"
  );

  // State for controlling the modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Function to open the modal and set the selected review
  const handleViewReview = (review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReview(null);
  };

  // Navigation hook
  const navigate = useNavigate();

  // Handle the redirect to the review page
  const handleWriteReview = () => {
    navigate("/employee/writereview"); // Redirect to the /review page
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {userInfo.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your personalized dashboard for job and company review
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
            <Typography color="text.secondary">
              Company: {userInfo.currentCompany}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Company Reviews */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reviews for {userInfo.currentCompany}
              </Typography>

              {/* Display button if an upcoming review exists */}
              {upcomingReview && (
                <Box sx={{ mb: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleWriteReview}
                  >
                    Write Review
                  </Button>
                </Box>
              )}

              <List>
                {currentCompanyReviews.map((review) => (
                  <Box key={review.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={review.reviewType}
                        secondary={`${review.companyName} - ${review.date}`}
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
                        Rating: {review.rating ? review.rating : "N/A"}
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                        onClick={() => handleViewReview(review)} // Open review modal
                      >
                        View Review
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

      {/* Modal for Viewing Review */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedReview.reviewType} - {selectedReview.companyName}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Date: {selectedReview.date}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Rating: {selectedReview.rating || "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Comment: {selectedReview.comment}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
