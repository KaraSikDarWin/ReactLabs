import React from "react";
import cubeInteractive from "../img/cube_interactive.png";
import CubeGame from "./cube/content";

export default function InteractiveSection() {
  return (
    <section className="section-interactive">
      <div className="interactive-container">
        <img
          className="img-interactive"
          src={cubeInteractive}
          alt="Интерактивный кубик"
          loading="lazy"
        />
        <h2 className="interactive-title">ИНТЕРАКТИВ</h2>
        <div className="interactive-content">
          <p className="interactive-text">
            Твой рекорд начинается здесь
            <br />– проверь свою скорость!
          </p>
        </div>
        <CubeGame />
      </div>
    </section>
  );
}
