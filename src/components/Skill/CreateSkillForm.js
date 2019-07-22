import React from 'react';
import { Mutation } from 'react-apollo'
import { createSkill } from '../../graphql/mutations'
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
});

class CreateSkillForm extends React.Component {
    state = { name: '', employeeID: this.props.employeeID  || ""};

    handleSubmit = (createSkill) => {
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

    validateForm = (e, createSkill) => {
        e.preventDefault();
        if(this.state.name) {
            this.handleSubmit(createSkill)
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Mutation mutation={gql(createSkill)} >
                {(createSkill, { data, loading, error }) => {
                    if (error) return <p>There was an error with this request</p>
                    return (
                        <div>
                            <Paper className={classes.root}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Add a new skill..."
                                    inputProps={{'aria-label': 'Add a new skill'}}
                                    onChange={(e) => this.setState({name: e.target.value})}
                                    value={this.state.name} 
                                    id="name" 
                                    label="Skill Name" 
                                />
                                <Button 
                                    onClick={(e) => this.validateForm(e, createSkill)} 
                                    variant="contained" 
                                    color="primary">
                                    {loading ? "Creating..." : "Add Skill"}
                                </Button>
                            </Paper>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}


export default withStyles(useStyles)(CreateSkillForm);
