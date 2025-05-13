import { useState } from "react";
import "./Gallery.css";

function Gallery(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? props.images.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === props.images.length - 1 ? 0 : prev + 1,
    );
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const images = props.images;
  const total = images.length;

  return (
    <div className="gallery-container">
      {/* Блок основного изображения с боковыми превью */}
      <div className="main-image-with-sides">
        <div className="side-image left" onClick={goToPrev}>
          <img
            src={images[(currentIndex - 1 + total) % total].thumbnail}
            alt="Предыдущее"
          />
        </div>

        <div className="main-image-center">
          <img
            src={images[currentIndex].full}
            alt={images[currentIndex].alt}
            onClick={() => openModal(currentIndex)}
            className="main-image"
          />
        </div>

        <div className="side-image right" onClick={goToNext}>
          <img
            src={images[(currentIndex + 1) % total].thumbnail}
            alt="Следующее"
          />
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>

            <img
              src={images[currentIndex].full}
              alt={images[currentIndex].alt}
              className="modal-image"
            />

            <div className="modal-nav">
              <button onClick={goToPrev}>‹</button>
              <span>
                {currentIndex + 1} / {total}
              </span>
              <button onClick={goToNext}>›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
