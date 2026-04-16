/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import Resume from "../../settings/resume.json";
import generationDiplomaPdf from "../../assets/diploma-generation-1.pdf";
import pythonCertificatePdf from "../../assets/attestato-python.pdf";
import generationDiplomaImg from "../../assets/diploma-generation_page-0001.jpg";
import pythonCertificateImg from "../../assets/attestato-python_page-0001(1).jpg";
import confluentCertificateImg from "../../assets/confluent-certificate.png";
import hackerRankCertificateImg from "../../assets/hackerrank.png";

import { InteractivePanel } from "./InteractivePanel";

import './About.css';


const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "auto",
  },
  sectionTitle: {
    marginBottom: '1.5em',
    fontSize: '1.5rem',
  },
}));

export const About = () => {
  const classes = useStyles();
  const greetings = "Hello there!";
  const aboutme = `I'm ${Resume.basics.name}, a ${Resume.basics.label}. ${Resume.basics.description}`;
  const mainCertifications = Resume.awards.filter((award) => !award.certificateUrl?.startsWith("http"));
  const externalCertifications = Resume.awards.filter((award) => award.certificateUrl?.startsWith("http"));
  const primaryExperience = Resume.work?.[0];
  const getAwardPdfPreview = (title) => {
    const id = title.toLowerCase();
    if (id.includes("generation")) return generationDiplomaPdf;
    if (id.includes("python")) return pythonCertificatePdf;
    return "";
  };
  const getAwardPdfLink = (award) => {
    if (award.certificateUrl?.startsWith("http")) return award.certificateUrl;
    return getAwardPdfPreview(award.title);
  };
  const getAwardImagePreview = (title) => {
    const id = title.toLowerCase();
    if (id.includes("generation")) return generationDiplomaImg;
    if (id.includes("python")) return pythonCertificateImg;
    return "";
  };
  const getExternalPreviewImage = (title) => {
    const id = title.toLowerCase();
    if (id.includes("confluent")) return confluentCertificateImg;
    if (id.includes("hackerrank")) return hackerRankCertificateImg;
    return "";
  };

  return (
    <section id="about">
      <Container component="main" className={classes.main} maxWidth="md">
        <div className="about">
          <div
            className="_img ui-surface"
            style={{ 
              background:
                'radial-gradient(1200px 500px at 30% 20%, var(--accent-soft), transparent 60%), linear-gradient(135deg, rgba(255,255,255,0.06), transparent)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              padding: "1.25rem 1.25rem 1.15rem"
            }}
          >
            <InteractivePanel />
          </div>
          <div className="_content_wrapper ui-surface" style={{ padding: "1.25rem 1.25rem 1.15rem" }}>
            <Typography component='h2' variant="h5">
              <TextDecrypt text={`${greetings}`} />
            </Typography>
            <p className="aboutme">
              {aboutme}
            </p>
            <a href="#contact" className="contact-btn ui-button ui-button--primary">
              <i className="fas fa-terminal" />
              <span>Send me a message</span>
            </a>
          </div>
        </div>

        {primaryExperience && (
          <div className="about-experience ui-surface">
            <Typography component='h3' variant="h6">
              Professional Experience
            </Typography>
            <Typography variant="body2" className="experience-summary">
              {primaryExperience.summary}
            </Typography>
            <div className="chip-row">
              {(primaryExperience.skills || []).map((skill, i) => (
                <span key={`${skill}-${i}`} className="ui-pill">
                  {skill}
                </span>
              ))}
            </div>
            <div className="now-building">
              <Typography variant="subtitle2" className="now-building__title">
                What I am building now
              </Typography>
              <div className="now-building__list">
                <span className="now-building__item">
                  <i className="fas fa-robot" />
                  GitHub Copilot + Claude models + agent orchestration
                </span>
                <span className="now-building__item">
                  <i className="fas fa-cube" />
                  3D printing experiments and robotics prototypes
                </span>
                <span className="now-building__item">
                  <i className="fas fa-microchip" />
                  Raspberry Pi projects for automation and maker workflows
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="about-education">
          <Typography component='h3' variant="h5" className={classes.sectionTitle}>
            <TextDecrypt text="Education & Certifications" />
          </Typography>

          {mainCertifications.map((award, index) => (
            <div key={index} className="award-card ui-surface">
              <div className="award-content">
                <i className="fas fa-award edu-card__badge" aria-hidden />
                <div className="edu-header">
                  <Typography variant="h6">{award.title}</Typography>
                  <Typography variant="caption" className="award-caption">
                    {new Date(award.date).getFullYear()} - {award.awarder}
                  </Typography>
                </div>
                <Typography variant="body2" className="award-role">
                  {award.role} {award.duration ? `• ${award.duration}` : ""}
                </Typography>
                <div className="summary-preview-row">
                  <Typography variant="body2" style={{ marginTop: '0.5em' }}>
                    {award.summary}
                  </Typography>
                  <div className="award-pdf-preview-wrap">
                    <div className="award-pdf-preview">
                      <img
                        src={getAwardImagePreview(award.title)}
                        alt={`${award.title} preview`}
                        className="award-preview-image"
                      />
                    </div>
                  </div>
                </div>
                <div className="chip-row">
                  {(award.labels || []).map((label, i) => (
                  <span key={`${award.title}-${i}`} className="ui-pill">
                    {label}
                  </span>
                ))}
              </div>
              {award.certificateUrl && (
                <a
                  href={getAwardPdfLink(award)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-button ui-button--outline cert-link-btn"
                >
                  <i className="fas fa-file-pdf" />
                  <span>Open certificate</span>
                </a>
              )}
              </div>
             
            </div>
          ))}

          {externalCertifications.length > 0 && (
            <div className="external-cert-grid">
              {externalCertifications.map((award, index) => (
                <a
                  key={`${award.title}-${index}`}
                  href={award.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-cert-card ui-surface"
                  aria-label={`Open ${award.title}`}
                >
                  <div className="external-cert-preview">
                    <img
                      src={getExternalPreviewImage(award.title)}
                      alt={`${award.title} preview`}
                      className="external-cert-image"
                    />
                  </div>
                  <div className="external-cert-meta">
                    <Typography variant="subtitle2" className="external-cert-title-row">
                      <i className="fas fa-certificate external-cert-icon" />
                      <span>{award.title}</span>
                    </Typography>
                    <Typography variant="caption" className="award-caption">
                      {award.awarder}
                    </Typography>
                    <Typography variant="caption" className="external-cert-host">
                      {award.previewHost || award.awarder} - {award.format || "Online Badge"}
                    </Typography>
                    <div className="chip-row">
                      {(award.labels || []).map((label, i) => (
                        <span key={`${award.title}-ext-${i}`} className="ui-pill">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
