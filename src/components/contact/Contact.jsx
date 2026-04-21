/* eslint-disable no-unused-vars */
import React from "react";
import { useRef } from "react";
import { Container, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "../content/TextDecrypt";
import Resume from '../../settings/resume.json';
import Swal from 'sweetalert2';

import './Contact.css';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: '100vw',
    marginTop: '3em',
    marginBottom: "3em",
  },
  form: {
    width: '100%',
  },
  formfield: {
    width: '100%',
    marginBottom: '2rem',
  },
}));



export const Contact = () => {
  const classes = useStyles();
  const greetings = "Say hello.";
  const contactEmail = Resume.basics.email;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const message = formData.get('message');
    
    // Create the mailto link
    const subject = encodeURIComponent(`Message from ${name} - Portfolio`);
    const body = encodeURIComponent(`Hi Eric,\n\nI'm reaching out through your portfolio.\n\nMy Name: ${name}\n\nMessage:\n${message}\n\nBest regards.`);
    const mailtoLink = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    
    // Open the mail client
    window.location.href = mailtoLink;

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Opening your email client...',
      text: 'Please send the pre-filled email in the window that just opened.',
      showConfirmButton: false,
      timer: 3000
    });

    e.target.reset();
  };



    return (
      <section id="contact">
        <Container component="main" className={classes.main} maxWidth="md">
          <div className="contact">
            <div>
              <h1 className="contact_msg">
                <TextDecrypt text={greetings}/>
              </h1>
            </div>
            <div className="_form_wrapper ui-surface">
              <form ref={form} onSubmit={sendEmail} className={classes.form}>
                <TextField
                  id="outlined-name-input"
                  label="Name"
                  type="text"
                  size="small"
                  variant="filled"
                  name="name"
                  required
                  className={classes.formfield}
                />
                <TextField
                  id="outlined-message-input"
                  label="Message"
                  type="textarea"
                  size="small"
                  multiline
                  minRows={5}
                  variant="filled"
                  name="message"
                  required
                  className={classes.formfield}
                />
                <button type="submit" value="Send" className="submit-btn ui-button ui-button--primary">
                  <i className="fas fa-terminal" />
                  <span>Send message</span>
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
  );
};
