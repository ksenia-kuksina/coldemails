import React from "react";
import DarkVeil from "./DarkVeil";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <DarkVeil />
      </div>
      <div className="hero-content">
        <h1>Write Laser-Targeted Cold Emails in Seconds</h1>
        <p>
          Our AI crafts tailored cold emails based on your background, offer,
          target, and industry. No fluff. Just conversion-ready copy.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;