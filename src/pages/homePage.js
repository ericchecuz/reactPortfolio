import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import "./styleHome.css";
import { useInView } from "react-intersection-observer";
import card1 from "../assets/card1.png";
import card3 from "../assets/cards2.png";
import card2 from "../assets/cards3.png";
import card4 from "../assets/cards4.png";
import tutorial1 from "../assets/tutorialscard1.png";
import tutorial2 from "../assets/tutorialscard2.png";

const ProjectCards = ({ title, description, image }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger quando il 50% della card è visibile
  });

  return (
    <>
      <div ref={ref} className={`card ${inView ? "fade-in" : "fade-out"}`}>
        <img className="img-cards" src={card1} />
        <h3>Project Angular Portfolio</h3>
        <p>
          A simple Portfolio made with Angular 16 and my custom components,
          using a simple design UX/UI.
        </p>
      </div>
      <div ref={ref} className={`card ${inView ? "fade-in" : "fade-out"}`}>
        <img className="img-cards" src={card2} alt={title} />
        <h3>Angular User Dashboard</h3>
        <p>
          Dashboard made in Angular 16 with implementation of FireBase
          Database/Auth, and more features.
        </p>
      </div>
      <div ref={ref} className={`card ${inView ? "fade-in" : "fade-out"}`}>
        <img className="img-cards" src={card3} alt={title} />
        <h3>React Portfolio</h3>
        <p>
          A complete portfolio with my projects and tutorial, made with my
          custom components.
        </p>
      </div>
      <div ref={ref} className={`card ${inView ? "fade-in" : "fade-out"}`}>
        <img className="img-cards" src={card4} alt={title} />
        <h3>Coming soon..</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

const TutorialCard = ({ title, description, image }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger quando il 50% della card è visibile
  });

  return (
    <>
      <div
        ref={ref}
        className={`card-tutorial ${inView ? "fade-in" : "fade-out"}`}
      >
        <img className="img-tutorial" src={tutorial1} />
        <div className="container-tag-tutorial">
          <div className="tag">Angular</div>
          <div className="tag">TypeScript</div>
        </div>
        <h3>Angular tutorial for beginners</h3>
        <p className="p-tutorial">
          Have you never used Angular first? This tutorial is the tutorial to
          start from
        </p>
        <div className="difficulty-container">
          <span className="difficulty-label">Difficulty:</span>
          <div className="difficulty-bar">
            <div className="difficulty-progress" style={{ width: "20%" }}></div>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`card-tutorial ${inView ? "fade-in" : "fade-out"}`}
      >
        <img className="img-tutorial" src={tutorial2} />
        <div className="container-tag-tutorial">
          <div className="tag">Angular</div>
          <div className="tag">React</div>
          <div className="tag">TypeScript</div>
        </div>
        <h3>FireBase tutorial for beginners</h3>
        <p className="p-tutorial">
          Have you never used FireBase for autentication first? This is the
          simple tutorial to learn FireBase Database
        </p>
        <div className="difficulty-container">
          <span className="difficulty-label">Difficulty:</span>
          <div className="difficulty-bar">
            <div className="difficulty-progress" style={{ width: "20%" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAgreementChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  return (
    <div className="subscription-container">
      <div className="container-input">
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          style={{ backgroundColor: isAgreed ? "#ff6547" : "#ccc" }}
          disabled={!isAgreed}
        >
          SUBSCRIBE
        </button>
      </div>
      <div className="custom-checkbox">
        <input
          type="checkbox"
          id="agree"
          checked={isAgreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agree">I have read the policy</label>
      </div>
    </div>
  );
}

function HomePage() {
  const [transform, setTransform] = useState("");

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 1.5; // Sposta l'immagine del 10% della distanza dal centro
    const deltaY = (clientY - centerY) * 1.5; // Sposta l'immagine del 10% della distanza dal centro

    setTransform(`translate(${deltaX}px, ${deltaY}px)`);
  };

  const handleMouseLeave = () => {
    setTransform(""); // Resetta la trasformazione quando il mouse lascia il contenitore
  };
  const projects = [
    {
      title: "Project 1",
      description: "Description 1",
      image: { card1 },
    },
    {
      title: "Project 2",
      description: "Description 2",
      image: "../assets/home2.png",
    },
    {
      title: "Project 3",
      description: "Description 3",
      image: "path/to/image3.jpg",
    },
    {
      title: "Project 4",
      description: "Description 4",
      image: "path/to/image4.jpg",
    },
  ];
  return (
    <div>
      <div className="main-container">
        <header className="header">
          <div className="logo-title">
            <div className="container-logo"></div>
            <div className="container-title1">ERIC</div>&nbsp;
            <div className="container-title2">DEVICE</div>
          </div>
          <div className="container-link">
            <a className="link"> ABOUT </a>
            <a className="link"> WORKS</a>
            <a className="link"> CONTACT</a>
            <div className="container-theme">
              {" "}
              <span className="material-symbols-outlined">dark_mode</span>
            </div>
          </div>
        </header>
        <div className="container-top">
          <div className="container-titles">
            <div className="container-title">Eric Checuz </div>
            <div className="container-subtitles">
              <div className="container-subtitle1">
                <h2 className="subtitle3">
                  <span className="subtitle4">Front-End </span> Developer
                </h2>
              </div>
            </div>
            <div className="container-tag">
              <div className="tag">JavaScript</div>
              <div className="tag">TypeScript</div>
              <div className="tag">Angular</div>
              <div className="tag">React</div>
              <div className="tag">Java</div>
              <div className="tag">Springboot</div>
              <div className="tag">Python</div>
              <div className="tag">SQL</div>
              <div className="tag">Figma</div>
            </div>
          </div>

          <div
            className="container-img-top"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: transform,
              transition: "transform 0.5s ease",
            }}
          >
            <img className="img-top"></img>
          </div>
        </div>
        <div className="arrow-container">
          <div className="arrow"></div>
        </div>
      </div>
      <div className="container-img2">
        <div className="container-contacts">
          <div className="contacts">
            <div className="container-icons">
              <div className="facebook"></div>
              <div className="instagram"></div>
              <div className="dividing-line"></div>
              <div className="linkedin"></div>
              <div className="telegram"></div>
            </div>
          </div>
        </div>
        <div className="text-project">Projects</div>{" "}
        <div className="section-projects">
          <div
            className="projects-container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <ProjectCards />
          </div>
        </div>
        <div className="container-img3">
          <div className="text-project">Tutorial</div>{" "}
          <div className="container-tutorials">
            <div className="cards-tutorials">
              <TutorialCard />
            </div>
          </div>
        </div>
        <div className="container-img4">
          <div className="container-img-sub"></div>
          <div className="container-subscribe">
            <p className="text-sub">
              Keep updated about latest content videos, articles, tips and news
            </p>
            <SubscriptionForm />
          </div>
          <footer>footer</footer>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
