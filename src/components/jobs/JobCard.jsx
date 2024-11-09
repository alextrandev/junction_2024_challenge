import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Grid2,
  Paper,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const JobCard = ({ job }) => {
  // Extract location details safely
  const { postcode, radius } = job.jobPosition.selectionCriteria.location;
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <Card sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 1, md: 1 }}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar {...stringAvatar(job.jobPosition.title)} />
              </StyledBadge>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" fontWeight="bold">
                {job.jobPosition.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {job.jobPosition.salary.currency} {job.jobPosition.salary.min} -{" "}
                {job.jobPosition.salary.max}
              </Typography>
              <Typography variant="body2">
                <strong>Skills Required:</strong>{" "}
                {job.jobPosition.selectionCriteria.skills.join(", ")}
              </Typography>
              <Typography variant="body2">
                <strong>Benefits:</strong> {job.jobPosition.benefits.join(", ")}
              </Typography>
              {/* Display postcode and radius separately */}
              <Typography variant="body2" color="textSecondary">
                Location: {postcode}, within {radius}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Button variant="contained" color="primary" fullWidth>
                Apply Now
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
