import { useParams, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

const ImagePage = ({ images, selectedFalse, allImagesId }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const image = images.find((image) => image.id.toString() === id);

  const isIdValid = allImagesId.includes(parseInt(id));

  const handleSwipeRight = () => {
    const numId = parseInt(id);
    if (numId < images.length) {
      const nextId = numId + 1;
      navigate(`/image/${nextId}`);
    }
  };

  console.log(images.length);

  const handleSwipeLeft = () => {
    const numId = parseInt(id);
    if (numId > 1 && isIdValid) {
      const nextId = numId - 1;
      navigate(`/image/${nextId}`);
    }
  };

  return (
    <section className="imagePage">
      <span title="close">
        <i className="bi bi-x img-page-x" onClick={selectedFalse}></i>
      </span>
      <Image src={image.src} height={30} width={100} className="img-fluid" />
      <span className="swipe-buttons">
        <i class="bi bi-caret-left-fill" onClick={handleSwipeLeft}></i>
        <i class="bi bi-caret-right-fill" onClick={handleSwipeRight}></i>
      </span>
    </section>
  );
};

export default ImagePage;
