import React from "react";
import { Link, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "./Logo";

const useStyles = makeStyles((theme) => ({
  svg: {
    position: "fixed",
    zIndex: 100,
    width: "52px",
    height: "52px",
    top: theme.spacing(3),
    left: theme.spacing(3),
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
    transition: "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "rgba(255, 255, 255, 0.13)",
      boxShadow: "0 10px 28px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255,255,255,0.16)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "44px",
      height: "44px",
      top: theme.spacing(2),
      left: theme.spacing(2),
      padding: "6px",
    },
  },
}));

export const LogoLink = () => {
  const classes = useStyles();

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Tooltip
      title="Back to home"
      placement="right"
      TransitionComponent={Zoom}
    >
      <Link
          variant="h6"
          href="#"
          onClick={handleLogoClick}
          underline="none"
          color="inherit"
          noWrap
          className={classes.svg}
          style={{ cursor: "pointer" }}
      >
        <Logo />
      </Link>
    </Tooltip>
  );
};
