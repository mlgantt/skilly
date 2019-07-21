import React from 'react';

import uuid from "uuid";

import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SkillBar from '../Skill/SkillBar';
import CreateSkillForm from '../Skill/CreateSkillForm';
import CreateAddressForm from '../Address/CreateAddressForm';


const useStyles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        marginBottom: '1rem',
    },
    skillForm: {
        display: 'flex',
        alignItems: 'center',
    },
});

class EmployeeForm extends React.Component {
    state = { 
        firstname: this.props.employee.firstname || '', 
        lastname: this.props.employee.lastname || '',
        addresses: this.props.employee.address || [],  
        addressID:this.props.employee.addressID || uuid.v4(),
        skills: this.props.employee.skills || [],  
        skillsID:this.props.employee.skillsID || uuid.v4()
    };

    addSkill = (skill) => {
        this.setState(state => {
            const skills = [...state.skills, skill.name];
            return {
                skills
            };
        });
    }

    removeSkill = (skill) => {
        this.setState(state => {
            const skills = state.skills.filter((item) => skill !== item);
            return {
                skills,
            };
        });
    }

    addAddress = ({line1, line2, city, state, zipcode}) => {
        const street = line2 ? (line1+", "+line2) : line1;
        const address = street+", "+city+", "+state+", "+zipcode;

        this.setState(state => {
            const addresses = [...state.addresses, address];
            return {
                addresses
            };
        });
    }

    removeAddress = ({line1, line2, city, state, zipcode}) => {
        const street = line2 ? (line1+", "+line2) : line1;
        const address = street+", "+city+", "+state+", "+zipcode;

        this.setState(state => {
            const addresses = state.addresses.filter((item) => address !== item);
            return {
                addresses,
            };
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className={classes.form} >
                    <Typography variant="h4" component="h2">Add a New Employee</Typography>
                    {this.props.error && <p>{this.props.error.message}</p>}
                    <FormControl className={classes.formControl}>
                        <TextField 
                            onChange={(e) => this.setState({firstname: e.target.value})}
                            value={this.state.firstname} 
                            autoFocus 
                            margin="dense" 
                            id="firstname" 
                            label="First Name" 
                            required
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField 
                            onChange={(e) => this.setState({lastname: e.target.value})}
                            value={this.state.lastname} 
                            margin="dense" 
                            id="lastname" 
                            label="Last Name" 
                            required
                        />
                    </FormControl>
                </form>
                <br />
                <Typography variant="h6" component="h3">Add a New Address</Typography>
                <Typography variant="h6" component="h3">{this.state.addresses}</Typography>
                <CreateAddressForm employeeID={this.state.addressID} afterSubmit={this.addAddress}/>
                <br />
                <Typography variant="h6" component="h3">Add Skills</Typography>
                <SkillBar skills={this.state.skills} onDelete={this.removeSkill} edit={true} />
                <CreateSkillForm employeeID={this.state.skillsID} afterSubmit={this.addSkill} />
                <br />
                <Button 
                    onClick={(e) => this.props.onSubmit(e,this.state, this.props.mutationInput)} 
                    variant="contained" 
                    color="primary">
                    {this.props.loading ? "Sending..." : this.props.loadingMSG}
                </Button>
            </div>
        )
    }
}


export default withStyles(useStyles)(EmployeeForm);
