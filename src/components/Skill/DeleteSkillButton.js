import React from 'react'
import { Mutation } from 'react-apollo';
import { deleteSkill } from '../../graphql/mutations';
import gql from 'graphql-tag';
import { listSkills } from '../../graphql/queries';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function DeleteSkillButton(props) {

    const handleDelete = (deleteSkill) => {
        deleteSkill({
            variables: {
                input: {
                    id: props.id
                }
            },
            optimisticResponse: () => ({
                deleteSkill: {
                    __typename: 'ModelSkillConnection',
                    id: props.id,
                    name: props.name,
                    employeeID: props.employeeID
                }
            }),
            update: (cache, { data: { deleteSkill } }) => {
                const query = gql(listSkills);
                const data = cache.readQuery({ query });

                data.listSkills.items = [...data.listSkills.items.filter(item => item.id !== props.id)];

                cache.writeQuery({ query, data });
            }
        })
    }

    return (
        <Mutation mutation={gql(deleteSkill)}>
            {(deleteSkill, { loading, error }) => {
                return (
                    <IconButton onClick={() => handleDelete(deleteSkill)} aria-label="Delete" >
                        <DeleteIcon />
                    </IconButton>
                );
            }}
        </Mutation>
    )
}

