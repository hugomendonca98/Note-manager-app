import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { GrayColor, WhiteColor } from "../Theme/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginBottom: "10px",
    marginTop: "10px",
  },
  align: {
    border: `solid 1px ${GrayColor}`,
    padding: "20px",
    backgroundColor: WhiteColor,
  },
}));

export default function TextArea(props) {
  const classes = useStyles();
  
  return (
    <FormControl fullWidth>
      <TextField
        className={classes.textField}
        id={props.id}
        label={props.label}
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
        multiline={props.multiline ? true : false}
        rows={props.rows ? props.rows : 1}
      />
    </FormControl>
  );
}