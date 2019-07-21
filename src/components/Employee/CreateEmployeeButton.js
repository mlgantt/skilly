import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CreateEmployeeForm from './CreateEmployeeForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

export default function CreateEmployeeButton() {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon className={classes.extendedIcon} />
        Add New Employee
      </Fab>
      <Dialog 
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <CreateEmployeeForm afterSubmit={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}