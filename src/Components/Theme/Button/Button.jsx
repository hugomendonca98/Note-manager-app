import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import theme from "../../Theme/MaterialUiColor/UiColor";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Button variant="contained" color={props.color} onClick={props.onClick}>
        {props.content}
      </Button>
    </div>
    </ThemeProvider>
  );
}
