import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleOpenToast } from "../../store/toastSlice";

export default function CompanyDataForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    history: "",
    businessId: "",
    workStyles: [],
    values: [],
    workingConditions: {
      flexibility: [],
      location: [],
      culture: "",
      mentalHealthSupport: false,
    },
    jobPosition: {
      title: "",
      salary: {
        min: "",
        max: "",
        currency: "EUR",
      },
      benefits: [],
      selectionCriteria: {
        skills: [],
        experience: "",
        rating: 0,
        location: {
          postcode: "",
          radius: "10 km",
        },
      },
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSalaryChange = (type) => (event) => {
    setFormData((prev) => ({
      ...prev,
      jobPosition: {
        ...prev.jobPosition,
        salary: {
          ...prev.jobPosition.salary,
          [type]: event.target.value,
        },
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await fetch("http://localhost:3001/Company", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error("Failed to submit data");

      dispatch(handleOpenToast({ message: "Company data submitted", severity: "success" }));
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit company information");
    }
  };

  return (
    <Paper elevation={3} className="tw-max-w-4xl tw-mx-auto tw-my-8">
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
        >
          Company Information Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Work Styles (comma-separated)"
                name="workStyles"
                value={formData.workStyles.join(", ")}
                onChange={handleArrayChange}
                helperText="Enter work styles separated by commas"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Values (comma-separated)"
                name="values"
                value={formData.values.join(", ")}
                onChange={handleArrayChange}
                helperText="Enter company values separated by commas"
              />
            </Grid>

            {/* Job Position Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
                Job Position
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobPosition.title"
                value={formData.jobPosition.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Salary"
                value={formData.jobPosition.salary.min}
                onChange={handleSalaryChange("min")}
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Maximum Salary"
                value={formData.jobPosition.salary.max}
                onChange={handleSalaryChange("max")}
                required
              />
            </Grid>

            {/* Add more fields following the same pattern... */}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2, height: 48, fontSize: "1.1rem" }}
              >
                Submit Company Information
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}
