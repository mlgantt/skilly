import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { deleteAddress } from '../graphql/mutations';
import gql from 'graphql-tag';
import { listAddresss } from '../graphql/queries';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



class DeleteAddress extends Component {

    handleDelete = (deleteAddress) => {
        deleteAddress({
            variables: {
                input: {
                    id: this.props.id
                }
            },
            optimisticResponse: () => ({
                deleteAddress: {
                    // This type must match the return type of the query below (listAddresss)
                    __typename: 'ModelAddressConnection',
                    id: this.props.id,
                    line1: this.props.line1,
                    line2: this.props.line2,
                    city: this.props.city, 
                    state: this.props.state,  
                    zipcode:this.props.zipcode,
                    employeeID: this.props.employeeID
                }
            }),
            update: (cache, { data: { deleteAddress } }) => {
                const query = gql(listAddresss);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated addressList to the cache copy
                data.listAddresss.items = [
                    ...data.listAddresss.items.filter(item => item.id !== this.props.id)
                ];

                //Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        return (
            <Mutation mutation={gql(deleteAddress)}>
                {(deleteAddress, { loading, error }) => {
                    return (
                        <IconButton
                            onClick={() => this.handleDelete(deleteAddress)}
                            aria-label="Delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    );
                }}
            </Mutation>
        )
    }
}


export default DeleteAddress;