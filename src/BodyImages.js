import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BodyImages = ({
  images,
  setImages,
  handleSelectImage,
  selectedImages,
}) => {
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleImageRoute = (id) => {
    if (selectedImages.length) return;
    navigate(`/image/${id}`);
  };

  const handleClick = (id) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      const timeout = setTimeout(() => {
        handleImageRoute(id);
        setClickTimeout(null);
      }, 300);
      setClickTimeout(timeout);
    }
  };

  const handleDoubleClick = (id) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    handleSelectImage(id);
    handleCheck(id);
  };

  const navigate = useNavigate();

  const handleCheck = (id) => {
    const mappedImg = images.map((image) =>
      image.id === id ? { ...image, checked: !image.checked } : image
    );
    setImages(mappedImg);
  };

  return (
    <>
      {images.map((image) => (
        <div
          className="position-relative"
          key={image.id}
          style={{
            width: image.width,
            height: image.height,
            margin: "4px",
          }}
        >
          {selectedImages && (
            <Form.Check
              style={{
                display: selectedImages.length ? "block" : "none",
              }}
              type="checkbox"
              checked={image.checked}
              onChange={() => {
                handleSelectImage(image.id);
                handleCheck(image.id);
              }}
              className="checkbox"
            />
          )}
          <Image
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "none",
              opacity: selectedImages.length ? "70%" : "100%",
            }}
            className="individual-images"
            onDoubleClick={() => {
              handleDoubleClick(image.id);
            }}
            onClick={() => handleClick(image.id)}
          />
        </div>
      ))}
    </>
  );
};

export default BodyImages;
