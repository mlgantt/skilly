import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EmployeeDisplay from '../Employee/EmployeeDisplay';
import AddressDisplay from '../Address/AddressDisplay';
import SkillDisplay from '../Skill/SkillDisplay';


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

    function TabPanel(props) {
        const { children, value, index} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }

    return (
        <main className={classes.root}>
            <AppBar position="static" className={classes.tabs}>
                <Tabs value={value} onChange={handleChange} aria-label="Skilly Main Content">
                    <Tab label="Employees" id="employee-tab" aria-controls="Employee Tab" />
                    <Tab label="Addresses" id="addresses-tab" aria-controls="Addresses Tab" />
                    <Tab label="Skills" id="skills-tab" aria-controls="Skills Tab" />
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

