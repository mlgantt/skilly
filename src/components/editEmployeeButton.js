import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import EditEmployeeForm from './editEmployeeForm';
import DeleteEmployeeForm from './deleteEmployeeForm';

export default function EditEmployeeButton(employee) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton aria-label="Edit" onClick={handleClickOpen}><EditIcon /></IconButton>

      <Dialog 
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <EditEmployeeForm employee={employee} afterSubmit={handleClose}/>
          <DeleteEmployeeForm {...employee} />
        </DialogContent>
      </Dialog>
    </div>
  );
}