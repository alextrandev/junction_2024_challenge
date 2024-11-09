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

export default function JobSeekerCultureDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { currentCompany } = useSelector((state) => state.company);
  // const { currentJobSeeker } = useSelector((state) => state.jobSeeker);
  const [localEditData, setLocalEditData] = useState({
    workStyles: [],
    values: [],
    workingConditions: {
      flexibility: [],
      location: [],
    },
  });

  useEffect(() => {
    if (currentCompany) {
      setLocalEditData({
        workStyles: currentCompany.workStyles?.join(", ") || "",
        values: currentCompany.values?.join(", ") || "",
        workingConditions: {
          flexibility:
            currentCompany.workingConditions?.flexibility?.join(", ") || "",
          location:
            currentCompany.workingConditions?.location?.join(", ") || "",
        },
      });
    }
  }, [currentCompany]);

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

  const handleSave = async () => {
    try {
      const formattedData = {
        ...currentCompany,
        workStyles: localEditData.workStyles
          .split(",")
          .map((item) => item.trim()),
        values: localEditData.values.split(",").map((item) => item.trim()),
        workingConditions: {
          ...currentCompany.workingConditions,
          flexibility: localEditData.workingConditions.flexibility
            .split(",")
            .map((item) => item.trim()),
          location: localEditData.workingConditions.location
            .split(",")
            .map((item) => item.trim()),
        },
      };
      await dispatch(updateCompany(formattedData)).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update company culture:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Company Culture</DialogTitle>
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
          helperText="Enter company values separated by commas"
          margin="normal"
        />
        <TextField
          label="Working Conditions - Flexibility (comma-separated)"
          fullWidth
          value={localEditData.workingConditions.flexibility}
          onChange={(e) =>
            handleWorkingConditionsChange("flexibility", e.target.value)
          }
          helperText="Enter flexibility options separated by commas"
          margin="normal"
        />
        <TextField
          label="Working Conditions - Location (comma-separated)"
          fullWidth
          value={localEditData.workingConditions.location}
          onChange={(e) =>
            handleWorkingConditionsChange("location", e.target.value)
          }
          helperText="Enter location options separated by commas"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
