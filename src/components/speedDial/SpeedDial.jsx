import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import Resume from "../../settings/resume.json";

const useStyles = makeStyles((theme) => ({
    speedDial: {
      position: "absolute",
      top: theme.spacing(6),
      right: theme.spacing(6),
    },
    iconColor: {
      color: theme.palette.foreground.default,
    },
}));

export const SpeedDials = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const navItems = [
        { name: 'Home', icon: 'fas fa-home', href: '#' },
        { name: 'About', icon: 'fas fa-user', href: '#about' },
        { name: 'Projects', icon: 'fas fa-briefcase', href: '#works' },
        { name: 'Contact', icon: 'fas fa-envelope', href: '#contact' },
    ];

    const navIcons = navItems.map((item) => (
        <SpeedDialAction
            key={item.name}
            icon={<i className={`${item.icon} ${classes.iconColor}`}></i>}
            tooltipTitle={item.name}
            onClick={handleClose}
            href={item.href}
            underline="none"
            color="inherit"
        />
    ));

    const socialIcons = Resume.basics.profiles.map((action) => (
      <SpeedDialAction
        key={action.network.toLowerCase()}
        icon={<i className={`${action.x_icon} ${classes.iconColor}`}></i>}
        tooltipTitle={action.network}
        onClick={handleClose}
        href={action.url}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        color="inherit"
      />
    ));

    return (
      <>
        <SpeedDial
          ariaLabel="SpeedDial"
          className={classes.speedDial}
          hidden={false}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="down"
        >
          {navIcons}
          {socialIcons}
        </SpeedDial>
      </>
    );
};
