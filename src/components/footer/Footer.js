import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="container-about">
          <div className="text-footer">ABOUT ME </div>
          <p className="p-footer">✉ Telegram </p>
          <p className="p-footer">✉ Linkedin </p>
          <p className="p-footer">✉ Instagram </p>
          <p className="p-footer">✉ Facebook </p>
        </div>

        <div className="container-community">
          <div className="text-footer">COMMUNITIES </div>
          <p className="p-footer">☆ Angular </p>
          <p className="p-footer">☆ React</p>
          <p className="p-footer">☆ JavaScript </p>
        </div>
        <div className="container-prod-sec">
          <div className="container-product">
            <div className="text-footer">PRODUCTS </div>
            <p className="p-footer">❤ Front-end Projects </p>
            <p className="p-footer">❤ Tutorials </p>
          </div>
          <div className="container-section">
            <div className="text-footer">SECTIONS</div>
            <p className="p-footer">✘ About </p>
            <p className="p-footer">✘ Works </p>
            <p className="p-footer">✘ Contact </p>
          </div>
        </div>
        <div className="container-footer-image">
          <div className="container-footer-img"></div>
          <p>© 2024 Eric's Device. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
