import React from "react";

export default function RegistrationSection() {
  return (
    <section className="section-registration">
      {/* SVG‑линии */}
      <svg className="line line-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 404" fill="none">
        <path d="M-212.189 318.258C-102.026 191.77 -19.3948 136.138 130.5 87.5432C371.333 9.46624 722.969 242.314 969.096 186.094C1139.96 147.065 1094.81 -226.634 1254.5 -127C1347.23 -69.1418 1519.77 279.469 1539 400" stroke="#2B80FF" strokeOpacity=".61" strokeWidth="41"/>
      </svg>

      <svg className="line line-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1215 513" fill="none">
        <path d="M20 517.736C61.4627 414.582 310.142 255.674 420 272.736C603.5 301.236 730.591 363.199 831 325.236C935.734 285.639 902.823 149.8 997 89.2365C1087.94 30.7547 1158.35 13.6088 1266 23.7365" stroke="#2B80FF" strokeOpacity=".61" strokeWidth="41"/>
      </svg>

      <div className="container-registration">
        <h1>СТОЛИЦА ДАЛЬНЕГО ВОСТОКА ЖДЁТ ТЕБЯ!</h1>
        <h2>Чемпионат России по спидкубингу – Владивосток 2025!</h2>
        <p className="description">
          Лучшие спидкуберы страны сразятся за титул чемпиона России!<br/>
          Столица Дальнего Востока уже ждёт твоего имени в списке чемпионов!
        </p>
        <p className="date">31 октября – 2 ноября 2025 г.</p>
        <button className="register-btn">ЗАРЕГИСТРИРОВАТЬСЯ</button>
      </div>

      <div className="participants">
        <span className="number">300</span>
        <span className="text">УЧАСТНИКОВ</span>
      </div>
    </section>
  );
}
