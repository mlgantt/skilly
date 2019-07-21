import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { deleteSkill } from '../../graphql/mutations';
import gql from 'graphql-tag';
import { listSkills } from '../../graphql/queries';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



class DeleteSkillButton extends Component {

    handleDelete = (deleteSkill) => {
        deleteSkill({
            variables: {
                input: {
                    id: this.props.id
                }
            },
            optimisticResponse: () => ({
                deleteSkill: {
                    // This type must match the return type of the query below (listSkills)
                    __typename: 'ModelSkillConnection',
                    id: this.props.id,
                    name: this.props.name,
                    employeeID: this.props.employeeID
                }
            }),
            update: (cache, { data: { deleteSkill } }) => {
                const query = gql(listSkills);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated skillsList to the cache copy
                data.listSkills.items = [
                    ...data.listSkills.items.filter(item => item.id !== this.props.id)
                ];

                //Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        return (
            <Mutation mutation={gql(deleteSkill)}>
                {(deleteSkill, { loading, error }) => {
                    return (
                        <IconButton
                            onClick={() => this.handleDelete(deleteSkill)}
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


export default DeleteSkillButton;
