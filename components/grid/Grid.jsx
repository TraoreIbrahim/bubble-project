import Button from "../button/Button";
import styles from "./Grid.module.css";
import ImageCarousel from "../imageCarousel/ImageCarousel";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Grid = () => {
  const [color, setColor] = useState("#FF7BAC");

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

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  return (
    <form className={styles.container}>
      <div className={styles.colorTitle}>
        <span className={styles.span}>1.</span>
        <p className={styles.p}>la couleur.</p>
        <div className={styles.inputColorContainer}>
          <input
            value={color}
            className={styles.inputColor}
            type="color"
            onChange={handleColorChange}
          />
        </div>
      </div>
      <div className={styles.colorDescription}>
        <p>Cliquez sur la bulle pour choisir la couleur de votre BubbleCard</p>
      </div>
      <div className={styles.colorEditor}></div>
      <div className={styles.messageTitle}>
        <span className={styles.span}>2.</span>
        <p className={styles.p}>le message.</p>
      </div>
      <div className={styles.messageDescription}>
        <p>300 caractères max.</p>
      </div>
      <textarea type="text" maxlength="300" className={styles.messageEditor} />

      <div className={styles.imageTitle}>
        <span className={styles.span}>3.</span>
        <p className={styles.p}>l'image.</p>
      </div>
      <div className={styles.imageDescription}>
        {/* <ImageCarousel /> */}
        <AliceCarousel
          responsive={responsive}
          mouseTracking
          items={images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              style={imageStyle}
              onClick={() => handleClick(image)}
            />
          ))}
        />
      </div>

      <div className={styles.viewTitle}>
        <span className={styles.span}>4.</span>
        <p className={styles.p}>l'aperçu.</p>
      </div>
      <div className={styles.viewDescription}></div>
      <div className={styles.imageEditor}></div>
      <div className={styles.viewEditor}>
        <div
          style={{
            backgroundColor: color,
            width: "600px",
            borderRadius: "100%",
            height: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            margin: "auto",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage.urls.small}
              alt=""
              style={{
                // height: "100%",
                position: "absolute",
                borderRadius: "100%",
                top: "50%",
                left: "50%",
                width: "50%",
                objectFit: "contain",
                // height: "30%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.emailTitle}>
        <span className={styles.span}>5.</span>
        <p className={styles.p}>le(s) destinataire(s).</p>
      </div>
      <div className={styles.emailDescription}>
        Entrez l'(les) adresse(s) email de votre(vos) destinatire(s)
      </div>
      <input type="email" multiple className={styles.emailEditor} />
      <div
        className={styles.button}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Button text="Envoyer">Envoyer</Button>
        <img
          className={styles.banner_img}
          style={{ width: 400 }}
          src="/images/girlNdog.png"
          alt="girl gum"
        />
      </div>
    </form>
  );
};

export default Grid;
