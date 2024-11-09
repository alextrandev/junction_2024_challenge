import { Typography, TextField, Button, Container } from "@mui/material";
import { css } from "@emotion/react";

const CongratulationsPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        🎉 Congratulations on your new position!
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can write your first review 6 months after your start date. Would
        you like a reminder e-mail for this?
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ mt: 2, maxWidth: "400px" }}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Set Reminder
      </Button>
    </Container>
  );
};

export default CongratulationsPage;
