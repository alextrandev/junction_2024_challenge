import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import CompanyDataForm from "./components/CompanyDataForm";
import SignInSelection from "./components/SignInSelection";

// Layout components (you'll need to create these)
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyDashboard from "./components/dashboards/CompanyDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFromApi } from "./api/jsonApi";
import JobSeekerDashboard from "./components/dashboards/JobSeekerDashboard";
import WriteReviewTooSoon from "./components/WriteReviewTooSoon";

// Auth pages (you'll need to create these)

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.example.posts);

  useEffect(() => {
    dispatch(fetchFromApi());
  }, [dispatch]);

  console.log(posts);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignInSelection />} />

          {/* Company Routes */}
          <Route path="/company">
            <Route
              path="dashboard"
              element={
                <ProtectedRoute userType="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute userType="company">
                  <CompanyDataForm />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* JobSeeker Routes */}
          <Route path="/jobseeker">
            <Route
              path="dashboard"
              element={
                <ProtectedRoute userType="jobseeker">
                  <JobSeekerDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Employee Routes */}
          <Route path="/employee">
            <Route
              path="dashboard"
              element={
                <ProtectedRoute userType="employee">
                  <div>Employee Dashboard (Coming Soon)</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="congratulations"
              element={
                // <ProtectedRoute userType="employee">
                <WriteReviewTooSoon />
                // </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
