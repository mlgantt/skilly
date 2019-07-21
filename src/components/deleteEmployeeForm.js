import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { deleteEmployee } from '../graphql/mutations';
import gql from 'graphql-tag';
import { listEmployees } from '../graphql/queries';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';


const useStyles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',

  },
  formControl: {
    marginTop: '1rem',
  }
});

class DeleteEmployee extends Component {

    handleDelete = (deleteEmployee) => {
        deleteEmployee({
            variables: {
                input: {
                    id: this.props.id
                }
            },
            optimisticResponse: () => ({
                deleteEmployee: {
                    // This type must match the return type of the query below (listEmployees)
                    __typename: 'ModelEmployeeConnection',
                    id: this.props.id,
                    firstname: this.props.firstname,
                    lastname: this.props.lastname,
                    created: this.props.created,
                    addresses: this.props.addresses,
                    addressID: this.props.addressID,
                    skills: this.props.skills,
                    skillsID: this.props.skillsID
                }
            }),
            update: (cache, { data: { deleteEmployee } }) => {
                const query = gql(listEmployees);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated employeesList to the cache copy
                data.listEmployees.items = [
                    ...data.listEmployees.items.filter(item => item.id !== this.props.id)
                ];

                //Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Mutation mutation={gql(deleteEmployee)}>
                {(deleteEmployee, { loading, error }) => {
                    return (
                        <form className={classes.form}>
                            <Typography variant="h4" component="h2">Delete Employee</Typography>
                            <Typography component="p">Clicking this button will delete the employee.</Typography>
                            <FormControl className={classes.formControl}>
                                <Button
                                    onClick={() => this.handleDelete(deleteEmployee)}
                                    aria-label="Delete"
                                    variant="contained" 
                                    color="secondary"
                                >
                                    <DeleteIcon />
                                    Delete Employee
                                </Button>
                            </FormControl>
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}


export default withStyles(useStyles)(DeleteEmployee);

