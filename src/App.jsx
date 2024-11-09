import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import CompanyDataForm from "./components/company/CompanyDataForm";
import SignInSelection from "./components/SignInSelection";

// Layout components (you'll need to create these)
import CompanyDashboard from "./components/dashboards/CompanyDashboard";
import EmployeeDashboard from "./components/dashboards/EmployeeDashboard";
import JobSeekerDashboard from "./components/dashboards/JobSeekerDashboard";
import WriteReview from "./components/employee/WriteReview";
import WriteReviewTooSoon from "./components/employee/WriteReviewTooSoon";
import JobSearch from "./components/jobseeker/JobSearch";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./ThemeContext";
import JobseekerMatchPage from "./components/dashboards/JobseekerMatchPage";
import CompanyMatchPage from "./components/dashboards/CompanyMatchPage";

// Auth pages (you'll need to create these)
function App() {
  return (
    <ThemeProvider>
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
              <Route
                path="match"
                element={
                  <ProtectedRoute userType="company">
                    <CompanyMatchPage />

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
              <Route
                path="jobs"
                element={
                  <ProtectedRoute userType="jobseeker">
                    <JobSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="match"
                element={
                  <ProtectedRoute userType="jobseeker">
                    <JobseekerMatchPage />
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
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="congratulations"
                element={
                  <ProtectedRoute userType="employee">
                    <WriteReviewTooSoon />
                  </ProtectedRoute>
                }
              />
              <Route
                path="writereview"
                element={
                  <ProtectedRoute userType="employee">
                    <WriteReview />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
