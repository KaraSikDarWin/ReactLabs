import Gallery from "./Gallery";
import "./Gall.css";
import img1 from "../../img/fefu_1.png";
import img2 from "../../img/fefu_2.png";
import img3 from "../../img/fefu_3.png";

function Gall() {
  const images = [
    {
      thumbnail: img1,
      full: img1,
      alt: "Описание изображения 1.",
    },
    {
      thumbnail: img2,
      full: img2,
      alt: "Описание изображения 2",
    },
    {
      thumbnail: img3,
      full: img3,
      alt: "Описание изображения 2",
    },
  ];

  return (
    <div className="Gall">
      <div className="gallery-full">
        <Gallery images={images} />
      </div>
    </div>
  );
}

export default Gall;
