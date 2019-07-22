import React from 'react';

import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';

import DeleteSkillButton from './DeleteSkillButton';


const useStyles = theme => ({
    emptyCard: {
        alignItems: 'center',
        display: 'flex',
        margin: '1rem auto',
        maxWidth: 750,
        minHeight: 200,
        justifyContent: 'center'
    },
});

class SkillCard extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const items = this.props.data.listSkills.items;
        const { classes } = this.props;
        if (items.length === 0) return <ListItem className={classes.emptyCard}>No Skills found</ListItem>
        
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
                            <DeleteSkillButton {...skill}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                </div>
            )
        })
    }
}


export default withStyles(useStyles)(SkillCard);
