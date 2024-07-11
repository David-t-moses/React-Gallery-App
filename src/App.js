import { useState, useEffect } from "react";
import { catImages } from "./images";
import Header from "./Header";
import Gallery from "./Gallery";
import ImagePage from "./ImagePage";
import { Routes, Route, useNavigate } from "react-router-dom";

function App({ bodyImages }) {
  const [images, setImages] = useState(() => {
    const storeImages = JSON.parse(localStorage.getItem("imagesList"));
    return storeImages || bodyImages;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [allImagesId, setAllImagesId] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("imagesList", JSON.stringify(images));
  }, [images]);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        const id = images.length ? images[images.length - 1].id + 1 : 1;
        const newImage = {
          src: imageData,
          alt: file.name,
          height: 90,
          width: 83,
          id: id,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleGetAllImagesId = images.map((image) => image.id);
    setAllImagesId(handleGetAllImagesId);
  }, [images]);

  const selectedFalse = () => {
    const mappedChecked = images.map((image) =>
      images.length ? { ...image, checked: false } : image
    );
    setImages(mappedChecked);
    setSelectedImages([]);
    setShowConfirmPopup(isVisible);
    navigate("/");
  };

  const handleSelectImage = (id) => {
    const isSelected = selectedImages.includes(id);
    if (isSelected) {
      const filteredImg = selectedImages.filter((image) => image !== id);
      setSelectedImages(filteredImg);
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // const handleDelete = () => {
  //   if (selectedImages.length === 0) return;
  //   const filteredImg = images.filter(
  //     (image) => !selectedImages.includes(image.id)
  //   );

  //   setImages(filteredImg);
  //   setSelectedImages([]);
  //   setShowConfirmPopup(isVisible);
  // };

  const handleDelete = () => {
    if (selectedImages.length === 0) return;

    // Create a new array with the remaining images
    const filteredImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );

    // Rename the IDs of the remaining images
    const updatedImages = filteredImages.map((image, index) => ({
      ...image,
      id: index + 1,
    }));

    setImages(updatedImages);
    setSelectedImages([]);
    setShowConfirmPopup(isVisible);
  };

  const handleShowComponent = () => {
    setShowConfirmPopup(!isVisible);
    console.log(allImagesId);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                handleFileChange={handleFileChange}
                selectedImages={selectedImages}
                selectedFalse={selectedFalse}
                handleDelete={handleDelete}
                handleShowComponent={handleShowComponent}
              />
              <Gallery
                showConfirmPopup={showConfirmPopup}
                catImages={catImages}
                images={images}
                setImages={setImages}
                handleSelectImage={handleSelectImage}
                selectedImages={selectedImages}
                handleShowComponent={handleShowComponent}
                handleDelete={handleDelete}
                selectedFalse={selectedFalse}
              />
            </>
          }
        />

        <Route
          path="/image/:id"
          element={
            <ImagePage
              images={images}
              selectedFalse={selectedFalse}
              allImagesId={allImagesId}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
