import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CreateEmployeeForm from '../Employee/CreateEmployeeForm';
import DialogButton from './DialogButton';


const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>Skilly</Typography>
        <DialogButton icon="add" buttonLabel="Add New Employee" ariaLabel="Add New Employee">
          <CreateEmployeeForm />
        </DialogButton>
      </Toolbar>
    </AppBar>
  );
}