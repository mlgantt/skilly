import React from 'react';
import { Mutation } from 'react-apollo'
import { updateEmployee } from '../../graphql/mutations'
import gql from 'graphql-tag';

import EmployeeForm from '../Forms/EmployeeForm';


class EditEmployeeForm extends React.Component {

    handleSubmit = (e, formValues, updateEmployee) => {
        e.preventDefault();
        updateEmployee({
            variables: {
                input: {
                    id: this.props.employee.id,
                    firstname: formValues.firstname,
                    lastname: formValues.lastname,
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
        return (
            <div>
                <Mutation mutation={gql(updateEmployee)} >
                    {(updateEmployee, { data, loading, error }) => {
                        return (
                            <EmployeeForm 
                                employee={this.props.employee}
                                mutationInput={updateEmployee} 
                                error={error}
                                loading={loading}
                                loadingMSG={"Update Employee"}
                                onSubmit={this.handleSubmit}
                            />
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}


export default EditEmployeeForm;
