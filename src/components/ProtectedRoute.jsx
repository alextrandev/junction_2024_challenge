import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  userType,
  allowedRoles = [],
}) {
  const [isLoading, setIsLoading] = useState(true);
  const storedUserRole = localStorage.getItem("userRole");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Check if user is authenticated
  if (!localStorage.getItem("token")) {
    return <Navigate to="/signin" replace />;
  }

  // Check if user has the correct role
  if (storedUserRole !== userType) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
