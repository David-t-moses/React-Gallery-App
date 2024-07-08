import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Catgories = ({ id, src, alt, title, height, width, description }) => {
  return (
    <Container>
      <Row>
        <Col className="my-auto text-center" key={id}>
          <Image
            src={src}
            alt={alt}
            title={title}
            height={height}
            width={width}
            rounded
          />
          <p className="mt-2 text-white">{description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Catgories;
