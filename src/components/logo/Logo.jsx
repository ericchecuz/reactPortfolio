import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EricLogo from "../../assets/logo.png.png";

const useStyles = makeStyles((theme) => ({
  logoWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px", // No padding in wrapper
  },
  img: {
    width: "100%", // Full width
    height: "100%", // Full height
    objectFit: "contain",
    borderRadius: "10px", // Matches the 12px container radius nicely
    transition: "transform 0.2s ease-in-out",
    scale: "2",
  },
}));

export const Logo = () => {
    const classes = useStyles();

    return (
        <div className={classes.logoWrapper}>
            <img src={EricLogo} alt="Eric Device Logo" className={classes.img} />
        </div>
    );
};