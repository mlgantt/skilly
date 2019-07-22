import React from 'react'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EmployeeDisplay from '../Employee/EmployeeDisplay';
import AddressDisplay from '../Address/AddressDisplay';
import SkillDisplay from '../Skill/SkillDisplay';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    alignItems: 'center',
  }
}));

export default function Main() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
	<main className={classes.root}>
		<AppBar position="static" className={classes.tabs}>
			<Tabs value={value} onChange={handleChange} aria-label="Skilly Main Content">
				<Tab label="Employees" {...a11yProps(0)} />
				<Tab label="Addresses" {...a11yProps(1)} />
				<Tab label="Skills" {...a11yProps(2)} />
			</Tabs>
		</AppBar>
		<TabPanel value={value} index={0}>
			<EmployeeDisplay />
		</TabPanel>
		<TabPanel value={value} index={1}>
			<AddressDisplay />
		</TabPanel>
		<TabPanel value={value} index={2}>
			<SkillDisplay />
		</TabPanel>
	</main>
  );
}

