import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function SkillBar(props) {
  const classes = useStyles();
  const skills = props.skills || [];
  const skillsObj = [];
  
  skills.forEach((skill,index) => {
    skillsObj.push({key:index, label:skill});
  });

  const handleDelete = chipToDelete => () => {
    props.onDelete(chipToDelete.label);
  };

  return (
    <div className={classes.root}>
      {skillsObj.map(data => {
        if(props.edit) {
          return (
            <Chip
              key={data.key}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          );
        } else {
          return (
            <Chip
              key={data.key}
              label={data.label}
              className={classes.chip}
            />
          );
        }
      })}
    </div>
  );
}