import React from 'react';
import { Mutation } from 'react-apollo'
import { createEmployee } from '../../graphql/mutations'
import gql from 'graphql-tag';

import EmployeeForm from '../Forms/EmployeeForm';


class CreateEmployeeForm extends React.Component {

    handleSubmit = (e, formValues, createEmployee) => {
        e.preventDefault();

        createEmployee({
            variables: {
                input: {
                    firstname: formValues.firstname,
                    lastname: formValues.lastname,
                    created: new Date().toLocaleString(),
                    addresses: formValues.addresses,  
                    addressID: formValues.addressID,
                    skills: formValues.skills,
                    skillsID: formValues.skillsID
                }
            }
        }).then(res => {
            this.props.afterSubmit();
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Mutation mutation={gql(createEmployee)} >
                    {(createEmployee, { data, loading, error }) => {
                        return (
                            <EmployeeForm 
                                employee={{}}
                                mutationInput={createEmployee} 
                                error={error}
                                loading={loading}
                                loadingMSG={"Add Employee"}
                                onSubmit={this.handleSubmit}
                            />
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}


export default CreateEmployeeForm;
