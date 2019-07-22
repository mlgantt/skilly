import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

export default function AddressBar(props) {
  const {addresses} = props;

  if (addresses.length === 0) return <Typography>No Addresss found</Typography>
  
  return (
    <List> 
    {
      addresses.map((address) => {
          const {id,line1, line2, city, state, zipcode} = JSON.parse(address);
          const street = line2 ? (line1+", "+line2) : line1;
          const addressLabel = street+", "+city+", "+state+", "+zipcode;
          return (
              <div key={id}>
                  <ListItem>
                      <ListItemText primary={addressLabel} />
                      <ListItemSecondaryAction>
                          <IconButton onClick={() => props.onDelete(address)} aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                      </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
              </div>
          )
      })
    }
    </List>
  )
}

