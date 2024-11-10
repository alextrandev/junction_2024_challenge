import { Box, Button, List, ListItem, Snackbar, TextField, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHash } from "../../store/hashcodeSlice";
import { handleOpenToast } from "../../store/toastSlice";

const GenerateHashcode = () => {
  const dispatch = useDispatch();
  const { status, error, currentHash } = useSelector((state) => state.hashes);
  const [contractStartDate, setContractStartDate] = useState("");
  const qrCodeRef = useRef();
  const [showHash, setShowHash] = useState(false);

  // Get companyId from localStorage or wherever you store it
  const companyId = localStorage.getItem("companyId") || 1;

  const generateHashCode = async () => {
    try {
      // this branch use mock data
      setShowHash(true);
      dispatch("1c6-ad74hp");
      // await dispatch(createHash(companyId)).unwrap();
      // dispatch(handleOpenToast({ message: "Successfully generate QR-Code", severity: "success" }));
    } catch (err) {
      dispatch(handleOpenToast({ message: "Copied to clipboard", severity: "error" }));
    }
  };

  const copyToClipboard = () => {
    // navigator.clipboard.writeText(currentHash?.hashcode);
    // fake hashcode
    navigator.clipboard.writeText("1c6-ad74hp");
    dispatch(handleOpenToast({ message: "Copied to clipboard", severity: "success" }));
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ textAlign: "left" }}>
        Generate QR-Code
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 1, textAlign: "left", wordWrap: "break-word" }}
      >
        When signing a contract with a new employee:
      </Typography>

      <List style={{ paddingLeft: "16px" }}>
        <ListItem>
          <Typography variant="body2">1. Select the contract start date.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">2. Click the Generate button.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">3. Copy the generated QR code.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">4. Paste the QR code into the contract document.</Typography>
        </ListItem>
      </List>

      <TextField
        label="Contract Start Date"
        type="date"
        value={contractStartDate}
        onChange={(e) => setContractStartDate(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generateHashCode}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Generating..." : "Generate"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}

      {showHash && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QRCodeSVG ref={qrCodeRef} value={"1c6-ad74hp"} size={256} />
          <Button variant="contained" onClick={copyToClipboard} sx={{ mt: 2 }}>
            Copy QR Code to Clipboard
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GenerateHashcode;
