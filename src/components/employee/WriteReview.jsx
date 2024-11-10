import {
  Box,
  Button,
  Container,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchCompanyHashes, useHash } from "../../store/hashcodeSlice";
import { extractCompanyId } from "../../utils/helperFunctions";
import { handleOpenToast } from "../../store/toastSlice";

const WriteReview = () => {
  const dispatch = useDispatch();
  const {
    items: companyHashes,
    status,
    error,
  } = useSelector((state) => state.hashes);
  const [hashcodeError, setHashcodeError] = useState("");
  const [ratings, setRatings] = useState({
    workEnvironment: 3,
    workLifeBalance: 3,
    management: 3,
    careerGrowth: 3,
    compensationBenefits: 3,
  });

  const [hashcode, setHashcode] = useState(""); // State for hashcode

  const debouncedHashcode = useDebounce(hashcode, 800); // 800ms delay

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSliderChange = (event, newValue, name) => {
    setRatings({ ...ratings, [name]: newValue });
  };

  const handleHashcodeChange = (event) => {
    setHashcode(event.target.value); // Update hashcode state
    setHashcodeError(""); // Clear error when user types
  };

  const handleSubmitReview = async () => {
    // this branch use mock data
    dispatch(handleOpenToast({ message: "Review submitted", severity: "success" }));
    navigate("/employee/dashboard");
    // try {
    //   setIsSubmitting(true);
    //   const result = await dispatch(
    //     useHash({ hashcode: debouncedHashcode })
    //   ).unwrap();

    //   if (result) {
    //     dispatch(handleOpenToast({ message: "Review submitted", severity: "success" }));
    //     navigate("/employee/dashboard"); // Clear the form
    //   }
    // } catch (error) {
    //   setHashcodeError("Failed to submit review. Please try again.");
    //   dispatch(handleOpenToast({ message: { hashcodeError }, severity: "error" }));
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  useEffect(() => {
    if (debouncedHashcode) {
      const companyId = extractCompanyId(debouncedHashcode);
      console.log("Extracted Company ID:", companyId);
      if (companyId) {
        dispatch(fetchCompanyHashes(companyId));
      }
    }
  }, [dispatch, debouncedHashcode]);

  useEffect(() => {
    if (status === "succeeded" && debouncedHashcode) {
      console.log("Available Hashes:", companyHashes);
      console.log("Current Hashcode:", debouncedHashcode);
      const isValidHash = companyHashes.some(
        (hash) => hash.hashcode === debouncedHashcode
      );
      console.log("Is Valid Hash:", isValidHash);
      if (!isValidHash) {
        setHashcodeError("Invalid hashcode");
      }
    }
  }, [status, companyHashes, debouncedHashcode]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      {/* Input field for hashcode */}
      <TextField
        label="Enter Your Unique Hashcode"
        value={hashcode}
        onChange={handleHashcodeChange}
        sx={{ mb: 2, width: "100%" }}
        error={!!hashcodeError}
        helperText={
          hashcodeError || (!hashcode ? "Please enter a valid hashcode" : "")
        }
      />

      {hashcode && debouncedHashcode && !hashcodeError && (
        <>
          <Typography variant="h5" gutterBottom>
            This is your first review for Company Name. You can write a new
            review yearly.
          </Typography>
          <Typography variant="body1" sx={{ mt: 4, mb: 2, textAlign: "left" }}>
            Please rate the following criteria:
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 4, textAlign: "left" }}
          >
            Consider each aspect of your experience carefully and rate based on
            your satisfaction, from 0 (very dissatisfied) to 5 (very satisfied).
            Your feedback is valuable in helping improve and maintain a positive
            work environment.
          </Typography>
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { label: "Work Environment", key: "workEnvironment" },
              { label: "Work-Life Balance", key: "workLifeBalance" },
              { label: "Management", key: "management" },
              { label: "Career Growth", key: "careerGrowth" },
              { label: "Compensation & Benefits", key: "compensationBenefits" },
            ].map(({ label, key }) => (
              <Box key={key} sx={{ textAlign: "left" }}>
                <Typography gutterBottom>{label}</Typography>
                <Slider
                  value={ratings[key]}
                  onChange={(event, newValue) =>
                    handleSliderChange(event, newValue, key)
                  }
                  step={1}
                  min={0}
                  max={5}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ width: "100%" }}
                />
              </Box>
            ))}
            <TextField
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
            <Button
              onClick={handleSubmitReview}
              variant="contained"
              color="primary"
              disabled={isSubmitting || !!hashcodeError || !hashcode}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default WriteReview;
