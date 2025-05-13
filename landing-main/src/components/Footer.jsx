import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-slogan">
          Столица Дальнего Востока зовёт – пора показать себя!
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-block">
          <a href="#">
            <div className="footer-line">
              ФЕДЕРАЦИЯ СПИДКУБИНГА<br/>ПРИМОРСКОГО КРАЯ
            </div>
          </a>
        </div>

        <div className="footer-block">
          <a href="#">
            <div className="footer-line">ФЕДЕРАЦИЯ СПИДКУБИНГА</div>
          </a>
        </div>

        <div className="footer-block">
          <a href="#">
            <div className="footer-line">SEACUBING RUSSIA CUP 2025</div>
          </a>
        </div>
      </div>
    </footer>
  );
}
