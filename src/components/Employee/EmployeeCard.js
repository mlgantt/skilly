import React from 'react';

import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SkillBar from '../Skill/SkillBar';
import EditEmployeeForm from './EditEmployeeForm';
import DialogButton from '../Shared/DialogButton';


const useStyles = theme => ({
    card: {
        margin: '1rem auto',
        maxWidth: 750,
    },
    emptyCard: {
        alignItems: 'center',
        display: 'flex',
        margin: '1rem auto',
        maxWidth: 750,
        minHeight: 200,
        justifyContent: 'center'
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
        if (items.length === 0) return <Card className={classes.emptyCard}>No Employees found</Card>
        
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
                                    <Typography variant="h5" component="p">Address:</Typography>
                                    {employee.addresses.map(item => {
                                        const address = JSON.parse(item);
                                        return <Typography key={address.id} variant="body1" component="p">{address.label}</Typography>
                                    })}
                                </div>
                                <div className={classes.employeeAddress} >
                                    <Typography variant="h5" component="p">Skills:</Typography>
                                    <SkillBar skills={employee.skills} />
                                </div>
                            </Grid>
                            <Grid item xs={2}className={classes.editButtonContainer}>
                                <DialogButton buttonType="icon" icon="edit">
                                    <EditEmployeeForm employee={employee} />
                                </DialogButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        })


    }

}


export default withStyles(useStyles)(EmployeeCard);
