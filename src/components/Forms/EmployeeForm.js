import React from 'react';

import uuid from "uuid";

import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AddressBar from '../Address/AddressBar';
import CreateAddressForm from '../Address/CreateAddressForm';
import SkillBar from '../Skill/SkillBar';
import CreateSkillForm from '../Skill/CreateSkillForm';


const useStyles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    skillForm: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
    }
});

class EmployeeForm extends React.Component {
    state = { 
        firstname: this.props.employee.firstname || '', 
        lastname: this.props.employee.lastname || '',
        addresses: this.props.employee.addresses || [],  
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

    addAddress = (address) => {
        const {line1, line2, city, state, zipcode} = address;
        const street = line2 ? (line1+", "+line2) : line1;
        address["label"] = street+", "+city+", "+state+", "+zipcode;
        
        this.setState(state => {
            const addresses = [...state.addresses, JSON.stringify(address)];
            return {
                addresses
            };
        });
    }

    removeAddress = (address) => {
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
                    <FormControl>
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
                    <FormControl>
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
                <AddressBar addresses={this.state.addresses} onDelete={this.removeAddress}/>
                <CreateAddressForm employeeID={this.state.addressID} afterSubmit={this.addAddress}/>
                <br />

                <Typography variant="h6" component="h3">Add Skills</Typography>
                <SkillBar skills={this.state.skills} onDelete={this.removeSkill} edit={true} />
                <CreateSkillForm employeeID={this.state.skillsID} afterSubmit={this.addSkill} />
                <br />

                <Typography variant="h6" component="h3">Submit</Typography>
                <Typography variant="body1" component="p">Click here to add your new Employee.</Typography>
                <br />
                <FormControl className={classes.buttonWrapper}>
                    <Button 
                        onClick={(e) => this.props.onSubmit(e,this.state, this.props.mutationInput)} 
                        variant="contained" 
                        color="primary">
                        {this.props.loading ? "Sending..." : this.props.loadingMSG}
                    </Button>
                </FormControl>
            </div>
        )
    }
}


export default withStyles(useStyles)(EmployeeForm);
