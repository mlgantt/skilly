import React from 'react';
import { Mutation } from 'react-apollo'
import { createAddress } from '../../graphql/mutations'
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';



const useStyles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        background: '#E5E5E5',
        padding: 12
    },
    inlineInput: {
        ['@media (min-width:600px)']: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    },
    buttonWrapper: {
        ['@media (min-width:600px)']: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    }
});

class CreateAddressForm extends React.Component {

    state = { 
        line1: '', 
        line2:'', 
        city: '', 
        state: '',  
        zipcode: '',
        employeeID: this.props.employeeID || ""
    };

    handleSubmit = (e, createAddress) => {
        e.preventDefault();

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

    render() {
        const { classes } = this.props;

        return (
            <Mutation mutation={gql(createAddress)} >
                {(createAddress, { data, loading, error }) => {
                    return (
                        <form className={classes.form} >
                            {error && <p>{error.message}</p>}
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
                                <TextField 
                                    className={classes.input}
                                    onChange={(e) => this.setState({state: e.target.value})}
                                    value={this.state.state} 
                                    margin="dense" 
                                    id="state" 
                                    label="State"  
                                    required
                                />
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
                                <Button 
                                    onClick={(e) => this.handleSubmit(e, createAddress)} 
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
