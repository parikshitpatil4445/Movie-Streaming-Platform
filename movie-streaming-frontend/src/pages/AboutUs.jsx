import React from "react";
import { Navigationbar } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";

// Import team member images
import Parikshit from "../images/Parikshit.jpg";
import Neha from "../images/Neha.jpg";
import Sagar from "../images/Sagar.jpg";

function AboutUs() {
  return (
    <>
      <Navigationbar />
      <div className="about-container">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">About Us</h1>
            <p className="hero-description">
              We are a team of passionate developers dedicated to bringing you the best
              streaming experience. Our platform is built with the latest technology
              to ensure smooth, high-quality entertainment for everyone.
            </p>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="vision-section">
          <div className="container">
            <h2 className="section-title">Our <span>Vision & Mission</span></h2>
            <div className="row g-4 justify-content-center">
              <div className="col-md-6">
                <div className="vision-card">
                  <h4 className="vision-title">Our Vision</h4>
                  <p className="vision-text">
                    To revolutionize the way people consume entertainment by providing
                    a seamless, immersive, and personalized streaming experience that
                    connects creators with audiences worldwide.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="vision-card">
                  <h4 className="vision-title">Our Mission</h4>
                  <p className="vision-text">
                    Our mission is to build a robust, secure, and user-friendly platform
                    that offers a vast library of content, accessible anytime, anywhere.
                    We strive for excellence in technology and user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title">Meet the <span>Team</span></h2>
            <div className="row g-4 justify-content-center">
              {/* Parikshit */}
              <div className="col-lg-4 col-md-6">
                <div className="team-card">
                  <div className="team-card-body">
                    <img
                      src={Parikshit}
                      alt="Parikshit Patil"
                      className="team-image"
                    />
                    <h5 className="team-name">Parikshit Patil</h5>
                    <p className="team-role">Backend Developer</p>
                    <p className="team-description">
                      Architecting robust APIs and ensuring secure data management.
                      Expert in Java Spring Boot and database optimization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Neha */}
              <div className="col-lg-4 col-md-6">
                <div className="team-card">
                  <div className="team-card-body">
                    <img
                      src={Neha}
                      alt="Neha Kothavade"
                      className="team-image"
                    />
                    <h5 className="team-name">Neha Kothavade</h5>
                    <p className="team-role">Frontend & Database</p>
                    <p className="team-description">
                      Crafting intuitive user interfaces with React and managing
                      complex data relationships. Passionate about UX design.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sagar */}
              <div className="col-lg-4 col-md-6">
                <div className="team-card">
                  <div className="team-card-body">
                    <img
                      src={Sagar}
                      alt="Sagar Band"
                      className="team-image"
                    />
                    <h5 className="team-name">Sagar Band</h5>
                    <p className="team-role">Frontend Developer</p>
                    <p className="team-description">
                      Focusing on responsive design and seamless user interactions.
                      Ensuring the platform looks great on all devices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-section text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} Movie Streaming Platform. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default AboutUs;