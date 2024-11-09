import { useState, useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

const GenerateHashcode = () => {
  const [contractStartDate, setContractStartDate] = useState("");
  const [hashcode, setHashcode] = useState("");
  const qrCodeRef = useRef();

  const generateHash = () => {
    const randomHash = `${Math.random().toString(36).substring(2, 15)}`;
    setHashcode(randomHash); // Remove date from the hash here
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashcode);
    alert("QR-Code copied to clipboard!");
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
      <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
        Generate QR-Code
      </Typography>

      <Typography
        variant="body2"
        sx={{ mt: 1, textAlign: "left", wordWrap: "break-word" }}
      >
        When signing a contract with a new employee:
      </Typography>

      <ol style={{ paddingLeft: "16px" }}>
        <li>
          <Typography variant="body2">
            Select the contract start date.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">Click the Generate button.</Typography>
        </li>
        <li>
          <Typography variant="body2">Copy the generated QR code.</Typography>
        </li>
        <li>
          <Typography variant="body2">
            Paste the QR code into the contract document.
          </Typography>
        </li>
      </ol>

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
      <Button variant="contained" color="primary" onClick={generateHash}>
        Generate
      </Button>

      {hashcode && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QRCodeSVG ref={qrCodeRef} value={hashcode} size={256} />
          <Button variant="contained" onClick={copyToClipboard} sx={{ mt: 2 }}>
            Copy QR Code to Clipboard
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GenerateHashcode;
