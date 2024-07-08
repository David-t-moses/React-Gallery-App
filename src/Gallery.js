import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { nanoid } from "nanoid";
import BodyImages from "./BodyImages";
import ConfirmDelete from "./ConfirmDelete";

const Gallery = ({
  images,
  setImages,
  catImages,
  handleSelectImage,
  selectedImages,
  showConfirmPopup,
  handleDelete,
  selectedFalse,
}) => {
  return (
    <Container fluid className="mt-4 gallery-container">
      {images ? (
        <>
          <Row className="first-row">
            {catImages.map((image) => (
              <Col className="text-center cat-img" key={image.id}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  height={image.height}
                  width={image.width}
                  rounded
                />
                <p className="mt-2 text-white">{image.description}</p>
              </Col>
            ))}
          </Row>
          {showConfirmPopup && (
            <Row className="confirm-popup text-center">
              <ConfirmDelete
                handleDelete={handleDelete}
                selectedFalse={selectedFalse}
              />
            </Row>
          )}
          <Row className="second-row">
            <p className="text-white fw-bold m-3 fs-4" key={nanoid()}>
              January
            </p>
            <Col className="mb-3 body-img-col" key={nanoid()}>
              <BodyImages
                images={images}
                setImages={setImages}
                handleSelectImage={handleSelectImage}
                selectedImages={selectedImages}
              />
            </Col>
          </Row>
        </>
      ) : (
        <p>No Image</p>
      )}
    </Container>
  );
};

export default Gallery;
