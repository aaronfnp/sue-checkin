import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ isCheckingOut, setIsCheckingOut }) {
  const [open, setOpen] = React.useState(false);

  const handleAgree = () => {
    setIsCheckingOut(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isCheckingOut}
        onClose={() => setIsCheckingOut(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to change this person`s status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCheckingOut(false)}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
