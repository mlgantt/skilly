import React from 'react';
import { Mutation } from 'react-apollo'
import { createAddress } from '../../graphql/mutations'
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = theme => ({
    form: {
        background: '#f7f7f9',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        padding: 12
    },
    inlineInput: {
        ['@media (min-width:600px)']: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    },
    button: {
        marginRight: 12
    },
    buttonWrapper: {
        ['@media (min-width:600px)']: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    },
    stateWrapper: {
        position: 'relative'
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: 4,
        color: '#721c24',
        padding: 5
    }
});

class CreateAddressForm extends React.Component {
    state = { 
        line1: '', 
        line2:'', 
        city: '', 
        state: '',  
        zipcode: '',
        employeeID: this.props.employeeID || "",
        validForm: true
    }

    handleSubmit = (createAddress) => {
        const input = {
            line1: this.state.line1, 
            city: this.state.city, 
            state: this.state.state,  
            zipcode:this.state.zipcode,
            employeeID: this.state.employeeID
        }

        if(this.state.line2) {
            input["line2"] = this.state.line2;
        }

        createAddress({
            variables: {
                input: input
            }
        }).then(res => {
            this.setState({
                line1:'', 
                line2:'', 
                city: '', 
                state:'',  
                zipcode:''
            });
            this.props.afterSubmit(res.data.createAddress);
        })
    }


    validateForm = (e, createAddress) => {
        e.preventDefault();
        const requiredFields = new Set(["line1","city",'state','zipcode']);
        let valid = true;

        for(let field in this.state) {
            if(requiredFields.has(field) && !this.state[field]) {
                valid = false;
                this.setState({validForm: false});
            }
        }

        if(valid) {
            this.setState({validForm: true});
            this.handleSubmit(createAddress);
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

        return (
            <Mutation mutation={gql(createAddress)} >
                {(createAddress, { data, loading, error }) => {
                    if (error) return <p>There was an error with this request</p>
                    return (
                        <form className={classes.form}>
                            {errorMessage}
                            <FormControl>
                                <TextField 
                                    onChange={(e) => this.setState({line1: e.target.value})}
                                    value={this.state.line1} 
                                    margin="dense" 
                                    id="line1" 
                                    label="Address Line 1" 
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <TextField 
                                    onChange={(e) => this.setState({line2: e.target.value})}
                                    value={this.state.line2} 
                                    margin="dense" 
                                    id="line2" 
                                    label="Address Line 2"  
                                />
                            </FormControl>
                            <FormControl className={classes.inlineInput}>
                                <TextField 
                                    className={classes.input}
                                    onChange={(e) => this.setState({city: e.target.value})}
                                    value={this.state.city} 
                                    margin="dense" 
                                    id="city" 
                                    label="City" 
                                    required
                                />
                                <div className={classes.stateWrapper}>
                                    <InputLabel htmlFor="state">State</InputLabel>
                                    <Select
                                        className={classes.input}
                                        onChange={(e) => this.setState({state: e.target.value})}
                                        value={this.state.state} 
                                        inputProps={{name: 'state',id:'state'}}
                                    >
                                        <MenuItem value="AL">Alabama</MenuItem>
                                        <MenuItem value="AK">Alaska</MenuItem>
                                        <MenuItem value="AZ">Arizona</MenuItem>
                                        <MenuItem value="AR">Arkansas</MenuItem>
                                        <MenuItem value="CA">California</MenuItem>
                                        <MenuItem value="CO">Colorado</MenuItem>
                                        <MenuItem value="CT">Connecticut</MenuItem>
                                        <MenuItem value="DE">Delaware</MenuItem>
                                        <MenuItem value="DC">District Of Columbia</MenuItem>
                                        <MenuItem value="FL">Florida</MenuItem>
                                        <MenuItem value="GA">Georgia</MenuItem>
                                        <MenuItem value="HI">Hawaii</MenuItem>
                                        <MenuItem value="ID">Idaho</MenuItem>
                                        <MenuItem value="IL">Illinois</MenuItem>
                                        <MenuItem value="IN">Indiana</MenuItem>
                                        <MenuItem value="IA">Iowa</MenuItem>
                                        <MenuItem value="KS">Kansas</MenuItem>
                                        <MenuItem value="KY">Kentucky</MenuItem>
                                        <MenuItem value="LA">Louisiana</MenuItem>
                                        <MenuItem value="ME">Maine</MenuItem>
                                        <MenuItem value="MD">Maryland</MenuItem>
                                        <MenuItem value="MA">Massachusetts</MenuItem>
                                        <MenuItem value="MI">Michigan</MenuItem>
                                        <MenuItem value="MN">Minnesota</MenuItem>
                                        <MenuItem value="MS">Mississippi</MenuItem>
                                        <MenuItem value="MO">Missouri</MenuItem>
                                        <MenuItem value="MT">Montana</MenuItem>
                                        <MenuItem value="NE">Nebraska</MenuItem>
                                        <MenuItem value="NV">Nevada</MenuItem>
                                        <MenuItem value="NH">New Hampshire</MenuItem>
                                        <MenuItem value="NJ">New Jersey</MenuItem>
                                        <MenuItem value="NM">New Mexico</MenuItem>
                                        <MenuItem value="NY">New York</MenuItem>
                                        <MenuItem value="NC">North Carolina</MenuItem>
                                        <MenuItem value="ND">North Dakota</MenuItem>
                                        <MenuItem value="OH">Ohio</MenuItem>
                                        <MenuItem value="OK">Oklahoma</MenuItem>
                                        <MenuItem value="OR">Oregon</MenuItem>
                                        <MenuItem value="PA">Pennsylvania</MenuItem>
                                        <MenuItem value="RI">Rhode Island</MenuItem>
                                        <MenuItem value="SC">South Carolina</MenuItem>
                                        <MenuItem value="SD">South Dakota</MenuItem>
                                        <MenuItem value="TN">Tennessee</MenuItem>
                                        <MenuItem value="TX">Texas</MenuItem>
                                        <MenuItem value="UT">Utah</MenuItem>
                                        <MenuItem value="VT">Vermont</MenuItem>
                                        <MenuItem value="VA">Virginia</MenuItem>
                                        <MenuItem value="WA">Washington</MenuItem>
                                        <MenuItem value="WV">West Virginia</MenuItem>
                                        <MenuItem value="WI">Wisconsin</MenuItem>
                                        <MenuItem value="WY">Wyoming</MenuItem>
                                    </Select>
                                </div>
                                <TextField 
                                    className={classes.input}
                                    onChange={(e) => this.setState({zipcode: e.target.value})}
                                    value={this.state.zipcode} 
                                    margin="dense" 
                                    id="zipcode" 
                                    label="ZIP Code"  
                                    required
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.buttonWrapper}>
                                <Button className={classes.button} onClick={(e) => this.props.handleCancel()}>Cancel</Button>
                                <Button 
                                    onClick={(e) => this.validateForm(e, createAddress)} 
                                    variant="contained" 
                                    color="primary">
                                    {loading ? "Creating..." : "Submit Address"}
                                </Button>
                            </FormControl>
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}


export default withStyles(useStyles)(CreateAddressForm);
