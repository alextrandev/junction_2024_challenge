import React from "react";
import {
  Box,
  Container,
  Typography,
  Slider,
  TextField,
  Button,
} from "@mui/material";

const WriteReview = () => {
  const [ratings, setRatings] = React.useState({
    workEnvironment: 3,
    workLifeBalance: 3,
    management: 3,
    careerGrowth: 3,
    compensationBenefits: 3,
  });

  const handleSliderChange = (event, newValue, name) => {
    setRatings({ ...ratings, [name]: newValue });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        This is your first review for Company Name. You can write a new review
        yearly.
      </Typography>
      <Typography variant="body1" sx={{ mt: 4, mb: 2, textAlign: "left" }}>
        Please rate the following criteria:
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: 4, textAlign: "left" }}
      >
        Consider each aspect of your experience carefully and rate based on your
        satisfaction, from 0 (very dissatisfied) to 5 (very satisfied). Your
        feedback is valuable in helping improve and maintain a positive work
        environment.
      </Typography>
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        {[
          { label: "Work Environment", key: "workEnvironment" },
          { label: "Work-Life Balance", key: "workLifeBalance" },
          { label: "Management", key: "management" },
          { label: "Career Growth", key: "careerGrowth" },
          { label: "Compensation & Benefits", key: "compensationBenefits" },
        ].map(({ label, key }) => (
          <Box key={key} sx={{ textAlign: "left" }}>
            <Typography gutterBottom>{label}</Typography>
            <Slider
              value={ratings[key]}
              onChange={(event, newValue) =>
                handleSliderChange(event, newValue, key)
              }
              step={1}
              min={0}
              max={5}
              marks
              valueLabelDisplay="auto"
              sx={{ width: "100%" }}
            />
          </Box>
        ))}
        <TextField
          label="Comments"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit Review
        </Button>
      </Box>
    </Container>
  );
};

export default WriteReview;
