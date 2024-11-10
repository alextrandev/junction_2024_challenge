import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../store/companySlice";
import { setCurrentJobSeeker, updateJobSeeker } from "../../store/jobSeekerSlice";
import { handleOpenToast } from "../../store/toastSlice";

export default function JobSeekerCultureDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { currentJobSeeker } = useSelector((state) => state.jobSeeker);
  const [localEditData, setLocalEditData] = useState({
    workStyles: [],
    values: [],
    workingConditions: {
      flexibility: [],
      location: {
        preferred: "",
        acceptance: [],
      },
      culture: "",
      salaryExpectations: {
        min: 0,
        max: 0,
        currency: "",
      },
      benefitExpectations: [],
    },
  });

  useEffect(() => {
    if (currentJobSeeker) {
      setLocalEditData({
        workStyles: currentJobSeeker.workStyles?.join(", ") || "",
        values: currentJobSeeker.values?.join(", ") || "",
        workingConditions: {
          flexibility:
            currentJobSeeker.workingConditions?.flexibility?.join(", ") || "",
          location: {
            acceptance: currentJobSeeker.workingConditions?.location?.acceptance?.join(", ") || "",
            preferred: currentJobSeeker.workingConditions?.location?.preferred || "",
          },
          culture: currentJobSeeker.workingConditions?.culture || "",
          salaryExpectations: {
            min: currentJobSeeker.workingConditions?.salaryExpectations?.min || 0,
            max: currentJobSeeker.workingConditions?.salaryExpectations?.max || 0,
            currency: currentJobSeeker.workingConditions?.salaryExpectations?.currency || "",
          },
          benefitExpectations: currentJobSeeker.workingConditions?.benefitExpectations?.join(", ") || "",
        },
      });
    }
  }, [currentJobSeeker]);

  const handleChange = (field, value) => {
    setLocalEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkingConditionsChange = (field, value) => {
    setLocalEditData((prev) => ({
      ...prev,
      workingConditions: {
        ...prev.workingConditions,
        [field]: value,
      },
    }));
  };

  const handleSalaryExpectationsChange = (field, value) => {
    setLocalEditData((prev) => ({
      ...prev,
      workingConditions: {
        ...prev.workingConditions,
        salaryExpectations: {
          ...prev.workingConditions.salaryExpectations,
          [field]: value,
        },
      },
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocalEditData((prev) => ({
      ...prev,
      workingConditions: {
        ...prev.workingConditions,
        location: {
          ...prev.workingConditions.location,
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    try {
      const formattedData = {
        ...currentJobSeeker,
        values: localEditData.values.split(",").map((item) => item.trim()),
        workStyles: localEditData.workStyles.split(",").map((item) => item.trim()),
        workingConditions: {
          ...currentJobSeeker.workingConditions,
          flexibility: localEditData.workingConditions.flexibility.split(",").map((item) => item.trim()),
          location: {
            acceptance: localEditData.workingConditions.location.acceptance.split(",").map((item) => item.trim()),
            preferred: localEditData.workingConditions.location.preferred,
          },
          culture: localEditData.workingConditions.culture,
          salaryExpectations: {
            min: localEditData.workingConditions.salaryExpectations.min,
            max: localEditData.workingConditions.salaryExpectations.max,
            currency: localEditData.workingConditions.salaryExpectations.currency,
          },
          benefitExpectations: localEditData.workingConditions.benefitExpectations.split(",").map((item) => item.trim()),
        },
      };
      dispatch(setCurrentJobSeeker(formattedData));
      dispatch(handleOpenToast({ message: "Job seeker work culture updated successfully", severity: "success" }));
      onClose();
    } catch (err) {
      console.error("Failed to update job seeker work culture:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit your work culture preferences</DialogTitle>
      <DialogContent>
        <TextField
          label="Work Styles (comma-separated)"
          fullWidth
          value={localEditData.workStyles}
          onChange={(e) => handleChange("workStyles", e.target.value)}
          helperText="Enter work styles separated by commas"
          margin="normal"
        />
        <TextField
          label="Values (comma-separated)"
          fullWidth
          value={localEditData.values}
          onChange={(e) => handleChange("values", e.target.value)}
          helperText="Enter values separated by commas"
          margin="normal"
        />
        <TextField
          label="Work Culture"
          fullWidth
          value={localEditData.workingConditions.culture}
          onChange={(e) => handleWorkingConditionsChange("culture", e.target.value)}
          helperText="Enter your preferred work culture"
          margin="normal"
        />
        <TextField
          label="Flexibility (comma-separated)"
          fullWidth
          value={localEditData.workingConditions.flexibility}
          onChange={(e) => handleWorkingConditionsChange("flexibility", e.target.value)}
          helperText="Enter flexibility options separated by commas"
          margin="normal"
        />
        <TextField
          label="Benefit Expectations (comma-separated)"
          fullWidth
          value={localEditData.workingConditions.benefitExpectations}
          onChange={(e) => handleWorkingConditionsChange("benefitExpectations", e.target.value)}
          helperText="Enter your benefit expectations separated by commas"
          margin="normal"
        />
        <TextField
          label="Location - Preferred"
          fullWidth
          value={localEditData.workingConditions.location.preferred}
          onChange={(e) => handleLocationChange("preferred", e.target.value)}
          helperText="Enter your preferred location"
          margin="normal"
        />
        <TextField
          label="Location - Acceptance (comma-separated)"
          fullWidth
          value={localEditData.workingConditions.location.acceptance}
          onChange={(e) => handleLocationChange("acceptance", e.target.value)}
          helperText="Enter location acceptance options separated by commas"
          margin="normal"
        />
        <TextField
          label="Salary Expectations - Min"
          fullWidth
          type="number"
          value={localEditData.workingConditions.salaryExpectations.min}
          onChange={(e) => handleSalaryExpectationsChange("min", e.target.value)}
          helperText="Enter your minimum salary expectation"
          margin="normal"
        />
        <TextField
          label="Salary Expectations - Max"
          fullWidth
          type="number"
          value={localEditData.workingConditions.salaryExpectations.max}
          onChange={(e) => handleSalaryExpectationsChange("max", e.target.value)}
          helperText="Enter your maximum salary expectation"
          margin="normal"
        />
        <TextField
          label="Salary Expectations - Currency"
          fullWidth
          value={localEditData.workingConditions.salaryExpectations.currency}
          onChange={(e) => handleSalaryExpectationsChange("currency", e.target.value)}
          helperText="Enter your preferred currency"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog >
  );
}
