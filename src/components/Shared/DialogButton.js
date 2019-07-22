import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: 45
  },
  closeButon: {
    right:0,
    top:0,
    position: 'absolute'
  }
}));

export default function DialogButton(props) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function ButtonType(props) {
    let icon;
    switch(props.icon) {
        case 'add':
          icon = <AddIcon />;
          break;
        case 'edit':
          icon = <EditIcon />
          break;
        case 'delete':
          icon = <DeleteIcon />
          break;
        default:
    }

    if(props.buttonType === "icon") {
        return <IconButton aria-label={props.ariaLabel} onClick={handleClickOpen}>{icon}</IconButton>
    } else {
        return (
          <Button variant="contained" aria-label={props.ariaLabel}  onClick={handleClickOpen}>
            {icon}
            {props.buttonLabel}
          </Button>
        )
    }
  }

  return (
    <div>
      <ButtonType {...props} />
      <Dialog 
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={handleClose} 
      >
        <DialogContent className={classes.dialogContent}>
        <IconButton 
          className={classes.closeButon} 
          color="inherit" 
          onClick={handleClose} 
          aria-label="Close">
          <CloseIcon />
        </IconButton>
          {React.cloneElement(props.children, { afterSubmit:handleClose})}
        </DialogContent>
      </Dialog>
    </div>
  );
}