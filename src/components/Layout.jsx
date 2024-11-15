import {
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  QrCode2 as QrCode2Icon,
  Settings as SettingsIcon,
  Work as WorkIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import logo_dark from "../assets/logo_dark.svg";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useTheme } from "../ThemeContext";
import Toast from "./utils/Toast";
import { handleOpenToast } from "../store/toastSlice";
import { useDispatch } from "react-redux";

export default function Layout() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  // Replace with actual auth logic
  const userRole = localStorage.getItem("userRole") || "guest";
  const isAuthenticated = localStorage.getItem("token");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setAnchorElUser(null); // Resetting menu state
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    dispatch(handleOpenToast({ message: "Logged out successfully", severity: "success" }));
    navigate("/");
  };

  const getNavItems = () => {
    switch (userRole) {
      case "company":
        return [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/company/dashboard",
          },
          {
            text: "Profile",
            icon: <BusinessIcon />,
            path: "/company/profile",
          },
          {
            text: "Create QR Code",
            icon: <QrCode2Icon />,
            path: "/company/generatecode",
          },
        ];
      case "jobseeker":
        return [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/jobseeker/dashboard",
          },
          {
            text: "Jobs",
            icon: <WorkIcon />,
            path: "/jobseeker/jobs",
          },
        ];
      case "employee":
        return [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/employee/dashboard",
          },
          {
            text: "Review",
            icon: <PersonIcon />,
            path: "/employee/writereview",
          },
        ];
      default:
        return [];
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img
          src={logo_dark}
          alt="ThriveConnect Logo"
          style={{
            height: "55px",
            width: "auto",
          }}
        />
      </Typography>
      <Divider />
      <List>
        {getNavItems().map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: "inherit",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu Icon */}
            {isAuthenticated && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={logo_dark}
                alt="ThriveConnect Logo"
                style={{
                  height: "55px",
                  width: "auto",
                }}
              />
            </Typography>

            {/* Empty space to push navigation to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Main Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              {isAuthenticated &&
                getNavItems().map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {item.icon}
                    {item.text}
                  </Button>
                ))}
            </Box>

            {/* User Profile */}
            {isAuthenticated ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                      {isDarkMode ? (
                        <Brightness7Icon fontSize="small" />
                      ) : (
                        <Brightness4Icon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <Typography textAlign="center">
                      {isDarkMode ? "Light" : "Dark"} Mode
                    </Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/settings">
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Settings</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Button component={Link} to="/signin" sx={{ color: "white" }}>
                    Sign In
                  </Button>
                  <Button onClick={handleOpenUserMenu} sx={{ color: "white" }}>
                    Sign Up
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <BusinessIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Sign up as Company</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Sign up as Job Seeker</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <BadgeIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography textAlign="center">Sign up as Employee</Typography>
                  </MenuItem>
                  <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                      {isDarkMode ? (
                        <Brightness7Icon fontSize="small" />
                      ) : (
                        <Brightness4Icon fontSize="small" />
                      )}
                    </ListItemIcon>
                    <Typography textAlign="center">
                      {isDarkMode ? "Light" : "Dark"} Mode
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} ThriveConnect. All rights reserved.
          </Typography>
        </Container>
      </Box>
      <Toast />
    </Box>
  );
}
