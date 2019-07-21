import React from 'react';

import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SkillBar from '../Skill/SkillBar';
import EditEmployeeButton from './EditEmployeeButton';


const useStyles = theme => ({
    card: {
        margin: '1rem auto',
        maxWidth: 750
    },
    avatar: {
        height: 80,
        marginRight: '1rem',
        width: 80,
    },
    avatarIcon: {
        height: 40,
        width: 40,
    },
    employeeDetail: {
        alignItems: 'center',
        display: 'flex',
        marginBottom: '1rem'
    },
    title: {
        marginBottom: '1rem'
    },
    employeeAddress: {
        marginBottom: '1rem'
    },
    editButtonContainer: {
        textAlign: 'right'
    },
});

class EmployeeCard extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const items = this.props.data.listEmployees.items;
        const { classes } = this.props;
        if (items.length === 0) return <Card className={classes.card}>No Employees found</Card>
        
        return items.map((employee) => {
            return (
                <Card key={employee.id} className={classes.card}>
                    <CardContent>
                        <Grid container className={classes.root}>
                            <Grid item xs={10}>
                                <div className={classes.employeeDetail} >
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon className={classes.avatarIcon}/>
                                    </Avatar>
                                    <div className={classes.employeeName}>
                                        <Typography className={classes.title} variant="h3" component="h3">
                                            {employee.firstname +" "+employee.lastname}
                                        </Typography>
                                        <Typography variant="body2" component="p">{"Added on " + employee.created}</Typography>
                                    </div>
                                </div>
                                <div className={classes.employeeAddress} >
                                    <Typography variant="h5" component="p">Adresses:</Typography>
                                    <Typography variant="body1" component="p">{employee.addresses}</Typography>
                                </div>
                                <div className={classes.employeeAddress} >
                                    <Typography variant="h5" component="p">Skills:</Typography>
                                    <SkillBar skills={employee.skills} />
                                </div>
                            </Grid>
                            <Grid item xs={2}className={classes.editButtonContainer}>
                                <EditEmployeeButton {...employee}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        })


    }

}


export default withStyles(useStyles)(EmployeeCard);
