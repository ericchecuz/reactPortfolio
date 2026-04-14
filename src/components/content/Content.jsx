import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";
import { FirstName, LastName } from "../../utils/getName";

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: "auto",
    marginBottom: "auto",
  },
  heading: {
    marginLeft: theme.spacing(50),
    "@media (max-width: 768px)": {
      marginLeft: theme.spacing(10),
    },
  },
  jobs: {
    "@media (max-width: 768px)": {
      fontSize: '3rem',
    },
  },
  experiencePanel: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1.25),
    padding: "0.55rem 0.8rem",
    borderRadius: "12px",
    border: "1px solid var(--border-subtle)",
    background: "linear-gradient(135deg, var(--primary-soft), transparent 60%)",
    color: "var(--text-primary)",
    fontFamily: '"Roboto Mono", monospace',
    minHeight: "66px",
  },
  experienceIcon: {
    color: "var(--primary)",
    fontSize: "1rem",
  },
  experienceMeta: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.15,
  },
  experienceLabel: {
    fontSize: "0.68rem",
    letterSpacing: "0.4px",
    color: "var(--text-secondary)",
  },
  experienceValue: {
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  experienceBadges: {
    marginTop: theme.spacing(1.5),
    display: "flex",
    alignItems: "stretch",
    gap: theme.spacing(1),
    flexWrap: "wrap",
  },
  currentRoleChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1.25),
    padding: "0.55rem 0.8rem",
    borderRadius: "12px",
    border: "1px solid var(--border-subtle)",
    background: "linear-gradient(135deg, var(--primary-soft), transparent 60%)",
    color: "var(--text-primary)",
    fontFamily: '"Roboto Mono", monospace',
    fontWeight: 700,
    fontSize: "0.95rem",
    letterSpacing: "0.3px",
    minHeight: "66px",
  },
  currentRoleMeta: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.15,
  },
  currentRoleLabel: {
    fontSize: "0.68rem",
    letterSpacing: "0.4px",
    color: "var(--text-secondary)",
  },
  currentRoleValue: {
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.3px",
    color: "var(--text-primary)",
  },
}));

export const Content = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.main} maxWidth="md">
      <div className={classes.heading}>
        <Typography variant="h5" component="h2">
            <TextDecrypt text={`${FirstName} ${LastName}`} />
        </Typography>
        <Typography variant="h1" component="h1" className={classes.jobs}>
            <TextDecrypt text={`${Resume.basics.job1} + `} />
            <TextDecrypt text={`${Resume.basics.job2}`} />
        </Typography>
        <div className={classes.experienceBadges}>
          <div className={classes.experiencePanel}>
            <i className={`fas fa-layer-group ${classes.experienceIcon}`} />
            <div className={classes.experienceMeta}>
              <span className={classes.experienceLabel}>PRO EXPERIENCE</span>
              <span className={classes.experienceValue}>3+ YEARS - BANKING & UI/UX</span>
            </div>
          </div>
          <span className={classes.currentRoleChip}>
            <i className={`fas fa-briefcase ${classes.experienceIcon}`} />
            <span className={classes.currentRoleMeta}>
              <span className={classes.currentRoleLabel}>Currently working</span>
              <span className={classes.currentRoleValue}>Angular Developer on enterprise banking products.</span>
            </span>
          </span>
        </div>
      </div>
    </Container>
  );
};
