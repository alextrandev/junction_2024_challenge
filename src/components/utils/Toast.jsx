import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseToast } from "../../store/toastSlice";

export default function Toast() {
  const snackbarOpen = useSelector((state) => state.toast.open);
  const message = useSelector((state) => state.toast.message);
  const severity = useSelector((state) => state.toast.severity);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={() => dispatch(handleCloseToast())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => dispatch(handleCloseToast())}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
