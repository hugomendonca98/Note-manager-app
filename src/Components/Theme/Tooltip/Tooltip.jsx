import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function TooltipSimple(props) {
  return (
      <Tooltip title={props.title}>{props.children}</Tooltip>
  );
}