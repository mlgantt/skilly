import React from 'react'
import { Query } from 'react-apollo'
import { listSkills } from '../../graphql/queries';
import { onCreateSkill } from '../../graphql/subscriptions'
import gql from 'graphql-tag';

import List from '@material-ui/core/List';

import SkillCard from './SkillCard'

class SkillDisplay extends React.Component {

    subscribeNewSkills = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateSkill),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newSkillData = subscriptionData.data.onCreateSkill;
                return Object.assign({}, prev, {
                    listSkills: {
                        ...prev.listSkills,
                        items: [...prev.listSkills.items, newSkillData]
                    }
                })
            }
        })
    }


    render() {
        return (
            <div>
                <List>
                    <Query query={gql(listSkills)}  >
                        {({ loading, data, error, subscribeToMore }) => {
                            if (loading) return <p>loading...</p>
                            if (error) return <p>{error.message}</p>
                                return <SkillCard data={data} subscribeToMore={() =>
                                    this.subscribeNewSkills(subscribeToMore)} />
                        }}
                    </Query>
                </List>
            </div>
        )
    }
}


export default SkillDisplay;