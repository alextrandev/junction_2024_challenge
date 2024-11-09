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
import { updateJobSeeker } from "../../store/jobSeekerSlice";

export default function JobSeekerProfileEditDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { currentJobSeeker } = useSelector((state) => state.jobSeeker);
  const [localEditData, setLocalEditData] = useState({
    bio: "",
    experience: "",
    distance: "",
    skills: [],
    // TODO: Add position history
  });

  useEffect(() => {
    if (currentJobSeeker) {
      setLocalEditData({
        bio: currentJobSeeker.bio || "",
        experience: currentJobSeeker.experience || "",
        distance: currentJobSeeker.distance || "",
        skills: currentJobSeeker.skills?.join(", ") || "",
        // TODO: Add position history
      });
    }
  }, [currentJobSeeker]);

  const handleChange = (field, value) => {
    setLocalEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const formattedData = {
        ...currentJobSeeker,
        bio: localEditData.bio,
        experience: localEditData.experience,
        distance: localEditData.distance,
        skills: localEditData.skills.split(",").map((skill) => skill.trim()),
        // TODO: Add position history
      };
      await dispatch(updateJobSeeker(formattedData)).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update job search profile:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Job Search Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Bio"
          multiline
          fullWidth
          value={localEditData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Experience"
          fullWidth
          value={localEditData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Distance willing to travel"
          fullWidth
          value={localEditData.distance}
          onChange={(e) => handleChange("distance", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Skills (comma-separated)"
          fullWidth
          value={localEditData.skills}
          onChange={(e) => handleChange("skills", e.target.value)}
          helperText="Enter skills separated by commas"
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
