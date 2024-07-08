import { useParams, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

const ImagePage = ({ images, selectedFalse }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const image = images.find((image) => image.id.toString() === id);

  const handleSwipeRight = () => {
    const numId = Number(id);
    if (numId <= images.length) {
      const num = Number(id);
      const nextId = num + 1;
      navigate(`/image/${nextId}`);
    }
  };

  const handleSwipeLeft = () => {
    const numId = Number(id);
    if (numId > 5) {
      const num = Number(id);
      const nextId = num - 1;
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
