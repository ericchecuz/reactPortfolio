/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";

import './Works.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
  },
  sectionTitle: {
    marginBottom: "1.5em",
    fontSize: "1.5rem",
    textAlign: "center",
  },
}));

export const Works = () => {
  const classes = useStyles();
  const projects = [
    { 
      id: 1,
      title: 'YSBR.it', 
      description: `A modern web platform built with React and Node.js featuring 
      interactive user interfaces, responsive design, and seamless user experience. 
      Focused on delivering a polished digital product with attention to performance and accessibility.`,
      website: 'https://ysbr.it',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    { 
      id: 2,
      title: 'Agriturismo da Simone', 
      description: `A complete website for an agriturismo business featuring 
      room bookings, photo galleries, event information, and local product showcase. 
      Built to highlight the rustic charm and hospitality of the farm stay experience.`,
      website: 'https://agriturismodasimone.it',
      tech: ['React', 'Firebase', 'Material-UI'],
      // Host CSP (frame-ancestors) allows only Hostinger domains, so the iframe is refused
      embeddable: false,
    },
    {
      id: 3,
      title: 'NomadRoadie',
      description: `UI/UX design system for an Android app connecting solo travelers nearby.
      Full artboard set — onboarding, auth, activity feed and a custom mascot — built with a
      warm Material 3 palette, ready to implement in Jetpack Compose.`,
      website: process.env.PUBLIC_URL + '/nomad-roadie/index.html',
      tech: ['UI/UX Design', 'Design System', 'Jetpack Compose'],
      note: 'Click to explore',
    },
  ];

  return (
    <section id="works">
      <Container component="main" className={classes.main} maxWidth="md">
        <div className="works-header">
          <Typography component='h3' variant="h5" className={classes.sectionTitle}>
            <TextDecrypt text="Projects" />
          </Typography>
        </div>
        {projects.map((project) => (
          <div className="project" key={ project.id }>
            <div className="__img_wrapper">
              <div className="works-hero ui-surface">
                {project.embeddable === false ? (
                  <div className="works-preview-fallback">
                    <i className="fas fa-leaf works-preview-fallback__icon" aria-hidden />
                    <span className="works-preview-fallback__title">{project.title}</span>
                    <span className="works-preview-fallback__note">
                      Live preview blocked by the host — open the site to explore it
                    </span>
                  </div>
                ) : (
                  <iframe
                    title={`${project.title} preview`}
                    src={project.website}
                    loading="lazy"
                    className={`works-site-preview${project.tall ? ' works-site-preview--tall' : ''}`}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                )}
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="works-hero__url"
                >
                  {project.note || project.website}
                </a>
              </div>
            </div>
            <div className="__content_wrapper ui-surface">
              <div className="works-content-main">
                <h3 className="title works-title-row">
                  <i className="fas fa-globe works-content-icon" />
                  <TextDecrypt text={ project.id + '. ' + project.title } />
                </h3>
                <p className="description">
                  { project.description }
                </p>
                <div className="works-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="ui-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="works-cta">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-button ui-button--outline"
                >
                  <i className="fas fa-external-link-alt" />
                  <span>{project.note ? 'Open full mockup' : 'Visit website'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};
