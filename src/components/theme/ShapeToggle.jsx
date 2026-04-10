import React, { useContext } from "react";
import { Tooltip, IconButton, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Shuffle } from "@material-ui/icons";
import { ThemeContext } from "./ThemeProvider";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    position: "fixed",
    bottom: theme.spacing(14),
    right: theme.spacing(6),
    height: "2.5rem",
    width: "2.5rem",
  },
  icon: {
    fontSize: "1.25rem",
  },
}));

export const ShapeToggle = () => {
  const { shapeType, toggleShape } = useContext(ThemeContext);
  const classes = useStyles();

  return (
    <Tooltip
      title={`Shape: ${shapeType}`}
      placement="right"
      TransitionComponent={Zoom}
    >
      <IconButton
        color="inherit"
        onClick={toggleShape}
        aria-label="Change background shape"
        className={classes.iconButton}
      >
        <Shuffle className={classes.icon} />
      </IconButton>
    </Tooltip>
  );
};
