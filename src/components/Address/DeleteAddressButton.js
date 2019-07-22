import React from 'react'
import { Mutation } from 'react-apollo';
import { deleteAddress } from '../../graphql/mutations';
import gql from 'graphql-tag';
import { listAddresss } from '../../graphql/queries';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function DeleteAddressButton(props) {

    const handleDelete = (deleteAddress) => {
        deleteAddress({
            variables: {
                input: {
                    id: props.id
                }
            },
            optimisticResponse: () => ({
                deleteAddress: {
                    __typename: 'ModelAddressConnection',
                    id: props.id,
                    line1: props.line1,
                    line2: props.line2,
                    city: props.city, 
                    state: props.state,  
                    zipcode:props.zipcode,
                    employeeID: props.employeeID
                }
            }),
            update: (cache, { data: { deleteAddress } }) => {
                const query = gql(listAddresss);
                const data = cache.readQuery({ query });

                data.listAddresss.items = [...data.listAddresss.items.filter(item => item.id !== props.id)];
                cache.writeQuery({ query, data });
            }
        })
    }

    return (
        <Mutation mutation={gql(deleteAddress)}>
            {(deleteAddress, { loading, error }) => {
                if (error) return <p>There was an error with this request</p>
                return (
                    <IconButton onClick={() => handleDelete(deleteAddress)} aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                );
            }}
        </Mutation>
    )
}

