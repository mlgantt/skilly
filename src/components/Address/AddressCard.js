import React from 'react';

import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';

import DeleteAddressButton from './DeleteAddressButton';


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

class AddressCard extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const items = this.props.data.listAddresss.items;
        const { classes } = this.props;
        if (items.length === 0) return <ListItem className={classes.emptyCard}>No Addresss found</ListItem>
        return items.map((address) => {
            const {line1, line2, city, state, zipcode} = address;
            const street = line2 ? (line1+", "+line2) : line1;
            const addressLabel = street+", "+city+", "+state+", "+zipcode;
            return (
                <div key={address.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={addressLabel} />
                        <ListItemSecondaryAction>
                            <DeleteAddressButton {...address}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                </div>
            )
        })
    }
}

export default withStyles(useStyles)(AddressCard);
