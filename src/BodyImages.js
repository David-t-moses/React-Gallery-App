import React, { useRef } from "react";
import { Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BodyImages = ({
  images,
  setImages,
  handleSelectImage,
  selectedImages,
}) => {
  const clickTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const handleCheck = (id) => {
    const mappedImg = images.map((image) =>
      image.id === id ? { ...image, checked: !image.checked } : image
    );
    setImages(mappedImg);
  };

  const handleImageRoute = (id) => {
    if (selectedImages.length) return;
    clickTimeoutRef.current = setTimeout(() => {
      navigate(`/image/${id}`);
    }, 1000);
  };

  const handleImageClick = (image, index) => {
    navigate(`/image`, { state: { images, currentIndex: index } });
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
          <Link to={`/image/${image.id}`}>
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
              // onClick={() => {
              //   handleSelectImage(image.id);
              //   handleCheck(image.id);
              // }}
              onMouseDown={() => handleImageRoute(image.id)}
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default BodyImages;
