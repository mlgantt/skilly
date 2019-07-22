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
        marginBottom: 16
    },
    title: {
        marginBottom: 12
    },
    body: {
        marginBottom: 16
    },
    formWrapper: {
        marginBottom: 16
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: 4,
        color: '#721c24',
        padding: 5
    }
});

class EmployeeForm extends React.Component {
    state = { 
        firstname: this.props.employee.firstname || '', 
        lastname: this.props.employee.lastname || '',
        addresses: this.props.employee.addresses || [],
        showAddress: false,
        addressID:this.props.employee.addressID || uuid.v4(),
        skills: this.props.employee.skills || [],  
        skillsID:this.props.employee.skillsID || uuid.v4(),
        validForm: true
    }

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
            const showAddress = false;
            const addresses = [...state.addresses, JSON.stringify(address)];
            return {
                addresses,
                showAddress
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

    toggleAddress = () => {
        if(this.state.showAddress){
            return <CreateAddressForm employeeID={this.state.addressID} afterSubmit={this.addAddress} handleCancel={()=>{ this.setState({showAddress: false})}}/>; 
        }
        return <Button onClick={()=>{ this.setState({showAddress: true})}} variant="contained" color="primary">Add an Address</Button>;
    }

    validateForm = (e) => {
        e.preventDefault();
        const requiredFields = new Set(["firstname","lastname"]);
        let valid = true;

        for(let field in this.state) {
            if(requiredFields.has(field) && !this.state[field]) {
                valid = false;
                this.setState({validForm: false});
            }
        }

        if(valid) {
            this.setState({validForm: true});
            this.props.onSubmit(this.state, this.props.mutationInput)
        }
    }

    render() {
        const { classes } = this.props;

        let errorMessage = null;
        if(!this.state.validForm) {
            errorMessage = (
                <Typography className={classes.errorMessage} variant="body1" component="p">
                    *Please complete all the required fields.
                </Typography>
            )
        }
        if (this.props.error) return <p>There was an error with this request</p>
        return (
            <div>
                <form className={classes.form}>
                    <Typography variant="h4" component="h2">Add a New Employee</Typography>
                    {errorMessage}
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

                <div className={classes.formWrapper}>
                    <Typography variant="h6" component="h3">Address</Typography>
                    <AddressBar addresses={this.state.addresses} onDelete={this.removeAddress}/>
                    {this.toggleAddress()}
                </div>

                <div className={classes.formWrapper}>
                    <Typography className={classes.title} variant="h6" component="h3">Skills</Typography>
                    <SkillBar skills={this.state.skills} onDelete={this.removeSkill} edit={true} />
                    <CreateSkillForm employeeID={this.state.skillsID} afterSubmit={this.addSkill} />
                </div>

                <div className={classes.buttonWrapper}>
                    <Typography variant="h6" component="h3">Submit</Typography>
                    <Typography className={classes.body} variant="body1" component="p">
                        Click here to add your new Employee.
                    </Typography>
                    
                    <Button 
                        onClick={(e) => this.validateForm(e)} 
                        variant="contained" 
                        color="primary">
                        {this.props.loading ? "Sending..." : this.props.loadingMSG}
                    </Button>
                </div>
            </div>
        )
    }
}


export default withStyles(useStyles)(EmployeeForm);
