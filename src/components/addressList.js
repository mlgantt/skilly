import React from 'react'
import { Query } from 'react-apollo'
import { listAddresss } from '../graphql/queries';
import { onCreateAddress } from '../graphql/subscriptions'
import gql from 'graphql-tag';

import List from '@material-ui/core/List';

import Address from './address'

class AddressList extends React.Component {

    subscribeNewAddress = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateAddress),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newAddressData = subscriptionData.data.onCreateAddress;
                return Object.assign({}, prev, {
                    listAddresss: {
                        ...prev.listAddresss,
                        items: [...prev.listAddresss.items, newAddressData]
                    }
                })
            }
        })
    }


    render() {
        return (
            <div>
                <List>
                    <Query query={gql(listAddresss)}  >
                        {({ loading, data, error, subscribeToMore }) => {
                            if (loading) return <p>loading...</p>
                            if (error) return <p>{error.message}</p>
                                return <Address data={data} subscribeToMore={() =>
                                    this.subscribeNewAddress(subscribeToMore)} />
                        }}
                    </Query>
                </List>
            </div>
        )
    }
}


export default AddressList;
