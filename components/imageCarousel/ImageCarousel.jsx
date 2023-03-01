import React, { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await axios.get(
        "https://api.unsplash.com/photos/?client_id=Qk5qEPK9_0WY3JOkbPJ-nu5VowgjTuSnJX-XcRVlDe4"
      );
      setImages(result.data);
    };
    fetchImages();
  }, []);

  const handleClick = (image) => {
    setSelectedImage(image);
    // Afficher une boîte de dialogue ou effectuer une autre action ici
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  const imageStyle = {
    height: "400px", // Définir la hauteur souhaitée
    width: "100%", // Définir la largeur souhaitée
    objectFit: "cover", // Empêcher le redimensionnement de l'image
  };

  return (
    <AliceCarousel
      responsive={responsive}
      mouseTracking
      items={images.map((image) => (
        <img
          src={image.urls.small}
          alt={image.alt_description}
          style={imageStyle}
        />
      ))}
    />
  );
};

export default ImageSlider;
