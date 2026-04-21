import React from "react";
import { Link, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Resume from "../../settings/resume.json";
import { Logo } from "./Logo";

const useStyles = makeStyles((theme) => ({
  svg: {
    position: "fixed",
    zIndex: 100,
    width: "65px", // Slightly larger for better visibility
    height: "65px",
    top: theme.spacing(4), // Closer to the edge for a modern look
    left: theme.spacing(4),
    backgroundColor: "rgba(255, 255, 255, 0.05)", // Glassmorphism base
    backdropFilter: "blur(12px)", // Frosted glass effect
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.15)", // Subtle border for glass look
    borderRadius: "12px", // Slightly softer radius
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px", // Small padding to keep logo from touching edges
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Lighter shadow
    transition: "transform 0.2s ease, background-color 0.2s ease", // Minimal transition
    "&:hover": {
      transform: "translateY(-2px)", // Simple lift instead of scale
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "50px",
      height: "50px",
      top: theme.spacing(3),
      left: theme.spacing(3),
    },
  },
}));

export const LogoLink = () => {
  const classes = useStyles();

  return (
    <Tooltip
      title={Resume.basics.name}
      placement="right"
      TransitionComponent={Zoom}
    >
      <Link
          variant="h6"
          href={Resume.basics.url}
          underline="none"
          color="inherit"
          noWrap
          className={classes.svg}
      >
        <Logo />
      </Link>
    </Tooltip>
  );
};
