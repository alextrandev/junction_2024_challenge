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
import { useDispatch } from "react-redux";
import { handleOpenToast } from "../store/toastSlice";

export default function SignInSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(handleOpenToast({ message: `Successfully logged in as ${option.title}`, severity: "success" }));
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
          alignItems: "center",
          py: 2.4,
        }}
      >
        <Box
          sx={{
            minHeight: "35vh",
            display: "flex",
            maxWidth: "75%",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            py: 2.4,
          }}
        >
          {/* Left Column - Title and Paragraph */}
          <Box sx={{ flex: 2, textAlign: "left", mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Redefine <br /> Work Well-being
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
          <Typography variant="h2" align="center" gutterBottom>
            Signed in as {localStorage.getItem("userRole")}
          </Typography>
        ) : (
          <Grid container spacing={0} justifyContent="center">
            {options.map((option) => (
              <Grid item xs={12} sm={6} md={3} key={option.title}>
                <Card
                  sx={{
                    height: "100%",
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 1,
                    overflow: "hidden",
                    background: `linear-gradient(135deg, ${option.color}45, ${option.color}15)`,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 4,
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: `${option.color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        color: option.color,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {option.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: "700", color: option.color, mb: 1 }}
                    >
                      {option.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {option.description}
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => handleSignIn(option)}
                      sx={{
                        mt: "auto",
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        backgroundColor: option.color,
                        color: "#fff",
                        fontWeight: "600",
                        "&:hover": {
                          backgroundColor: option.color,
                          filter: "brightness(85%)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          background: `${option.color}100)`,
                        },
                        background: `${option.color}99`,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
