import React from 'react';
import { Mutation } from 'react-apollo'
import { createSkill } from '../graphql/mutations'
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';



const useStyles = theme => ({
  formControl: {
    marginBottom: '1rem',
  }
});

class CreateSkillForm extends React.Component {

    state = { name: '', employeeID: this.props.employeeID  || ""};

    handleSubmit = (e, createSkill) => {
        e.preventDefault();
        createSkill({
            variables: {
                input: {
                    name: this.state.name,
                    employeeID: this.state.employeeID
                }
            }
        }).then(res => {
            this.setState({name: ''});
            this.props.afterSubmit(res.data.createSkill);
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Mutation mutation={gql(createSkill)} >
                    {(createSkill, { data, loading, error }) => {
                        return (
                            <div>
                                {error && <p>{error.message}</p>}
                                <FormControl className={classes.formControl}>
                                    <TextField 
                                        onChange={(e) => this.setState({name: e.target.value})}
                                        value={this.state.name} 
                                        margin="dense" 
                                        id="name" 
                                        label="Skill Name" 
                                    />
                                </FormControl>
                                <Button 
                                    onClick={(e) => this.handleSubmit(e, createSkill)} 
                                    variant="contained" 
                                    color="primary">
                                    {loading ? "Creating..." : "Add Skill"}
                                </Button>
                            </div>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}


export default withStyles(useStyles)(CreateSkillForm);
