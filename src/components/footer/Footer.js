import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="container-about">
          <div className="text-footer">ABOUT ME </div>
          <p>Telegram </p>
          <p>Linkedin </p>
          <p>Instagram </p>
          <p>Facebook </p>
        </div>

        <div className="container-community">
          <div className="text-footer">COMMUNITIES </div>
          <p>Angular </p>
          <p>React</p>
          <p>JavaScript </p>
        </div>
        <div className="container-prod-sec">
          <div className="container-product">
            <div className="text-footer">PRODUCTS </div>
            <p>Front-end Projects </p>
            <p>Tutorials </p>
          </div>
          <div className="container-section">
            <div className="text-footer">SECTIONS</div>
            <p>About </p>
            <p>Works </p>
            <p>Contact </p>
          </div>
        </div>
        <p>© 2024 Eric's Device. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
