import { Container, Row, Col, Image } from "react-bootstrap";
import { nanoid } from "nanoid";
import { useRef } from "react";

const Header = ({
  isVisible,
  handleFileChange,
  selectedImages,
  handleDelete,
  selectedFalse,
  setIsVisible,
  handleShowComponent,
}) => {
  const fileInputRef = useRef(null);
  const handleRefClick = () => {
    fileInputRef.current.click();
  };

  const input = (
    <input type="file" onChange={handleFileChange} ref={fileInputRef} />
  );

  const handleClick = () => {
    setIsVisible(true);
  };

  const handleHideClick = () => {
    setIsVisible(false);
  };

  return (
    <Container className="header-container">
      <Row>
        <Col
          className={
            selectedImages.length ? "delete-pop-visible" : "delete-pop-hidden"
          }
        >
          <div className="delete-share-copy-pop">
            <span onClick={selectedFalse}>
              <i className="bi bi-x"></i>
            </span>
            <span>
              <i className="bi bi-trash" onClick={handleShowComponent}></i>
            </span>
            <span>
              <i className="bi bi-copy"></i>
            </span>
            <span>
              <i className="bi bi-share"></i>
            </span>
          </div>
        </Col>
        <Col className="gallery-logo col-10">
          <span>
            <Image
              src={`${process.env.PUBLIC_URL}/img/gallery-icon-1.png`}
              alt="gallery-icon"
              height={40}
              width={40}
            />
          </span>
          <div className="display-5 text-white fs-1">Gallery</div>
        </Col>
        <Col className="three-dots" key={nanoid()}>
          <span>
            <i
              class="bi bi-three-dots-vertical fs-2 heading-three-dots text-white"
              onClick={handleClick}
            ></i>
          </span>
        </Col>
        <Col onMouseLeave={handleHideClick} className="pop-list-div">
          {isVisible && (
            <div className="pop-list-inner-div">
              <p>Select items</p>
              <p>Settings</p>
              <p onClick={handleRefClick}>Add image</p>
              <p>Trash</p>
              <p>Favourites</p>
            </div>
          )}
        </Col>
      </Row>
      <div style={{ display: "none" }}>{input}</div>
    </Container>
  );
};

export default Header;
