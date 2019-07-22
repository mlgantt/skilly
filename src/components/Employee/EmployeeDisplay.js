import React from 'react'
import { Query } from 'react-apollo'
import { listEmployees } from '../../graphql/queries';
import { onCreateEmployee } from '../../graphql/subscriptions'
import gql from 'graphql-tag';

import EmployeeCard from './EmployeeCard'


export default function EmployeeDisplay() {

    const subscribeNewEmployees = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateEmployee),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newEmployeeData = subscriptionData.data.onCreateEmployee;
                return Object.assign({}, prev, {
                    listEmployees: {
                        ...prev.listEmployees,
                        items: [...prev.listEmployees.items, newEmployeeData]
                    }
                })
            }
        })
    }

    return (
        <div>
            <Query query={gql(listEmployees)}  >
                {({ loading, data, error, subscribeToMore }) => {
                    if (loading) return <p>loading...</p>
                    if (error) return <p>There was an error with this request</p>

                    return <EmployeeCard data={data} subscribeToMore={() => subscribeNewEmployees(subscribeToMore)} />
                }}
            </Query>
        </div>
    )
}
