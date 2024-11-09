import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../store/companySlice";

export default function ProfileEditDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { currentCompany } = useSelector((state) => state.company);
  const [localEditData, setLocalEditData] = useState({
    name: currentCompany?.name || "",
    history: currentCompany?.history || "",
    businessId: currentCompany?.businessId || "",
  });

  const handleChange = (field, value) => {
    setLocalEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...currentCompany,
        ...localEditData,
      };
      await dispatch(updateCompany(updatedData)).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update company profile:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Company Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Company Name"
          fullWidth
          value={localEditData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Company History"
          fullWidth
          multiline
          rows={4}
          value={localEditData.history}
          onChange={(e) => handleChange("history", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Business ID"
          fullWidth
          value={localEditData.businessId}
          onChange={(e) => handleChange("businessId", e.target.value)}
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
