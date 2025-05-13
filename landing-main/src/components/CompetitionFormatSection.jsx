import React from "react";
import cubeImage from "../img/img_competition.png";          // поправь путь под свою структуру

export default function CompetitionFormatSection() {
  return (
    <section className="section-competition-format">
      <div className="competition-format-conteiner">
        <h1>формат проведения<br/>соревнований</h1>
        <p className="description">
          На чемпионате будут все официальные дисциплины и&nbsp;кубок регионов!
        </p>
        <p className="amount-price">Размер взноса</p>
        <p className="price">
          1‑3 дисциплины – 1500&nbsp;рублей<br/>
          4‑7 дисциплин – 2500&nbsp;рублей<br/>
          8+ дисциплин – 3500&nbsp;рублей
        </p>
      </div>

      <div className="blue-circle">
        <span className="text">
          Кубик 4×4×4 – 150 чел<br/>
          Кубик 5×5×5 – 120 чел<br/>
          Кубик 6×6×6 – 50 чел<br/>
          Кубик 7×7×7 – 50 чел<br/>
          CLOCK – 120 чел<br/>
          3×3×3 ОН – 120 чел<br/>
          MEGAMINX – 100 чел
        </span>
      </div>

      <img className="img-competition" src={cubeImage} alt="Изображение кубика" />
    </section>
  );
}
