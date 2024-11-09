import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#40A0E6", // Blue
      light: "#9BC7A5", // Light Blue
      dark: "#004c8f",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E68641", // orange
      light: "#FFF5CC", // light yellow
      dark: "#C71585", // Dark Pink
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5", // Gray
      paper: "#FFFFFF", // White
    },
    text: {
      primary: "#005BAC",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: "#005BAC",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#005BAC",
    },
    body1: {
      fontSize: "1rem",
      color: "#005BAC",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#E5F2FA",
      light: "#FFFFFF",
      dark: "#005BAC",
      contrastText: "#005BAC",
    },
    secondary: {
      main: "#FF69B4", // Lighter pink for dark mode
      light: "#FFB6C1",
      dark: "#FF1493",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#E5F2FA",
      secondary: "#A3A3A3",
    },
  },
});
