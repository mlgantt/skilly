import React from 'react';
import { Mutation } from 'react-apollo'
import { updateEmployee } from '../../graphql/mutations'
import gql from 'graphql-tag';

import EmployeeForm from './EmployeeForm';
import DeleteEmployeeForm from './DeleteEmployeeForm';

export default function EditEmployeeForm(props) {

    const handleSubmit = (formValues, updateEmployee) => {
        updateEmployee({
            variables: {
                input: {
                    id: props.employee.id,
                    firstname: formValues.firstname,
                    lastname: formValues.lastname,
                    addresses: formValues.addresses,  
                    addressID: formValues.addressID,
                    skills: formValues.skills,
                    skillsID: formValues.skillsID
                }
            }
        }).then(res => {
            props.afterSubmit();
        })
    }

    return (
        <div>
            <Mutation mutation={gql(updateEmployee)} >
                {(updateEmployee, { data, loading, error }) => {
                    return (
                        <div>
                        <EmployeeForm 
                            employee={props.employee}
                            mutationInput={updateEmployee} 
                            error={error}
                            loading={loading}
                            loadingMSG={"Update Employee"}
                            onSubmit={handleSubmit}
                        />
                        <br />
                        <DeleteEmployeeForm {...props.employee} />
                        </div>
                    )
                }}
            </Mutation>
        </div>
    )
}
