import React from "react";
import img1 from "../img/fefu_1.png";
import img2 from "../img/fefu_2.png";
import img3 from "../img/fefu_3.png";
import Gall from "../components/gallery_web/Gall";

export default function FefuSection() {
  return (
    <section className="section-fefu">
      <div className="fefu-container">
        <h2 className="fefu-title">
          ДВФУ – интеллектуальная арена
          <br />
          для чемпионов!
        </h2>
        <p className="fefu-text">
          Кампус Дальневосточного федерального университета – ведущая площадка
          масштабных событий, где наука встречается со спортом. Именно здесь,
          в&nbsp;самом современном образовательном центре Дальнего Востока,
          пройдёт Чемпионат России по&nbsp;спидкубингу!
        </p>

        <div className="fefu-gallery">
          <Gall />
        </div>
      </div>
    </section>
  );
}
