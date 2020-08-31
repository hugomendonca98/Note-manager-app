import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  font: {
    fontSize: 24,
  },
});

export default function H2(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom className={classes.font}>
        {props.content}
      </Typography>
    </div>
  );
}
