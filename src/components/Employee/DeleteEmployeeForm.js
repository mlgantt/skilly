import React from 'react'
import { Mutation } from 'react-apollo';
import { deleteEmployee } from '../../graphql/mutations';
import gql from 'graphql-tag';
import { listEmployees } from '../../graphql/queries';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  formControl: {
    marginTop: '1rem',
  }
}));

export default function DeleteEmployeeForm(props) {

    const classes = useStyles();

    const handleDelete = (deleteEmployee) => {
        deleteEmployee({
            variables: {
                input: {
                    id: props.id
                }
            },
            optimisticResponse: () => ({
                deleteEmployee: {
                    __typename: 'ModelEmployeeConnection',
                    id: props.id,
                    firstname: props.firstname,
                    lastname: props.lastname,
                    created: props.created,
                    addresses: props.addresses,
                    addressID: props.addressID,
                    skills: props.skills,
                    skillsID: props.skillsID
                }
            }),
            update: (cache, { data: { deleteEmployee } }) => {
                const query = gql(listEmployees);
                const data = cache.readQuery({ query });

                data.listEmployees.items = [...data.listEmployees.items.filter(item => item.id !== props.id)];

                cache.writeQuery({ query, data });
            }
        })
    }

    return (
        <Mutation mutation={gql(deleteEmployee)}>
            {(deleteEmployee, { loading, error }) => {
                if (error) return <p>There was an error with this request</p>
                return (
                    <form className={classes.form}>
                        <Typography variant="h4" component="h2">Delete Employee</Typography>
                        <Typography component="p">Clicking this button will delete the employee.</Typography>
                        <FormControl className={classes.formControl}>
                            <Button
                                onClick={() => handleDelete(deleteEmployee)}
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


