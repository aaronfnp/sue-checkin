import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  isCheckingOut,
  setIsCheckingOut,
  checkInPerson,
  checkOutPerson,
  selectedWorkerIndex,
  setSelectedWorkerIndex,
  workerList,
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(isCheckingOut);
  }, [isCheckingOut]);

  const handleAgree = () => {
    if (selectedWorkerIndex !== null && workerList[selectedWorkerIndex]) {
      if (workerList[selectedWorkerIndex].isCheckedOut) {
        checkInPerson(selectedWorkerIndex);
      } else {
        checkOutPerson(selectedWorkerIndex);
      }
    }
    setIsCheckingOut(false);
    setSelectedWorkerIndex(null);
  };

  const handleCancel = () => {
    setIsCheckingOut(false);
    setSelectedWorkerIndex(null);
  };

  if (selectedWorkerIndex === null || !workerList[selectedWorkerIndex]) {
    return <div></div>;
  }

  const selectedWorker = workerList[selectedWorkerIndex];
  const actionText = selectedWorker.isCheckedOut ? "check in" : "check out";

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Change Worker Status</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to <span className="bold">{actionText}</span>{" "}
          {selectedWorker.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
