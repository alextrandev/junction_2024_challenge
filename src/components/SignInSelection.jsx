import {
  Badge as BadgeIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/aava_logo_new.png";

export default function SignInSelection() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Company",
      description: "Sign in as a company to find talents",
      icon: <BusinessIcon sx={{ fontSize: 60 }} />,
      path: "/company/dashboard",
      color: "#1976d2", // MUI primary blue
    },
    {
      title: "Job Seeker",
      description: "Sign in to search and apply for jobs",
      icon: <PersonIcon sx={{ fontSize: 60 }} />,
      path: "/jobseeker/dashboard",
      color: "#2e7d32", // MUI success green
    },
    {
      title: "Employee",
      description: "Sign in as an existing employee to post review",
      icon: <BadgeIcon sx={{ fontSize: 60 }} />,
      path: "/employee/dashboard",
      color: "#9c27b0", // MUI purple
    },
  ];

  const handleSignIn = (option) => {
    localStorage.setItem("token", "mock-token");
    localStorage.setItem(
      "userRole",
      option.title.toLowerCase().replaceAll(" ", "")
    );
    navigate(option.path);
  };

  return (
    <Container maxWidth="false">
      <Box
        sx={{
          minHeight: "25vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 2.4,
        }}
      >
        <Box
          sx={{
            minHeight: "25vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on larger screens
            justifyContent: "center",
            alignItems: "center",
            py: 2.4,
          }}
        >
          {/* Left Column - Title and Paragraph */}
          <Box sx={{ flex: 1, textAlign: "center", mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Redefine Work Well-being
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              At ThriveConnect, we believe that work well-being is essential to
              personal and professional growth. Our platform aims to help
              individuals and organizations foster a healthy work-life balance,
              encourage professional development, and create meaningful
              connections for a more fulfilling career journey.
            </Typography>
          </Box>

          {/* Right Column - Image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="ThriveConnect"
              style={{
                maxWidth: "180px",
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </Box>
        </Box>

        {localStorage.getItem("token") ? (
          <Typography variant="h5" align="center" gutterBottom>
            Signed in as {localStorage.getItem("userRole")}
          </Typography>
        ) : (
          <Grid container spacing={0} justifyContent="center">
            {options.map((option) => (
              <Grid item xs={12} sm={6} md={3} key={option.title}>
                <Card
                  sx={{
                    height: "100%",
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 4
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: `${option.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        color: option.color,
                      }}
                    >
                      {option.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {option.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {option.description}
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => handleSignIn(option)}
                      sx={{
                        mt: "auto",
                        backgroundColor: option.color,
                        "&:hover": {
                          backgroundColor: option.color,
                          filter: "brightness(90%)",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
