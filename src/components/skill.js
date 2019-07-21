import React from 'react';


import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';

import DeleteSkill from './deleteSkill';


const useStyles = theme => ({
    card: {
        margin: '1rem auto',
        maxWidth: 750
    },
});

class Skill extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const items = this.props.data.listSkills.items;
        const { classes } = this.props;
        if (items.length === 0) return <ListItem className={classes.card}>No Skills found</ListItem>
        
        return items.map((skill) => {
            return (
                <div key={skill.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BuildIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={skill.name} />
                        <ListItemSecondaryAction>
                            <DeleteSkill {...skill}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                </div>
            )
        })


    }

}


export default withStyles(useStyles)(Skill);