import React, { useState, useEffect } from "react";

import Button from "../button/Button";
import styles from "./Grid.module.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import DynamicTextarea from "../reactQuill/DynamicTextarea";
import axios from "axios";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
const Grid = () => {
  const [color, setColor] = useState("");

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const handleThemeChange = (event) => {
    console.log(event.target.value);
    setSelectedTheme(event.target.value);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        [{ size: ["extra-small", "small", "medium", "large"] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
      ],
    },
  };
  useEffect(() => {
    const fetchImages = async () => {
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${selectedTheme}&client_id=Qk5qEPK9_0WY3JOkbPJ-nu5VowgjTuSnJX-XcRVlDe4`
      );
      setImages(result.data.results); // mettre à jour les images
    };
    fetchImages();
  }, [selectedTheme]); // utiliser selectedTheme comme dépendance

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

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleDownload = (e) => {
    if (imageLoaded) {
      e.preventDefault();
      const content = document.getElementById("content");

      html2canvas(content, {
        useCORS: true, // Permet d'utiliser l'image depuis une URL externe
        allowTaint: true, // Permet d'utiliser l'image depuis une URL externe
        logging: true, // Affiche des logs dans la console
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e);
  };

  return (
    <>
      <form className={styles.container}>
        <div className={styles.colorTitle}>
          <span className={styles.span}>1.</span>
          <p className={styles.p}>la couleur.</p>
        </div>
        <div className={styles.colorDescription}>
          <p>
            Cliquez sur la bulle pour choisir la couleur de votre BubbleCard :
          </p>
        </div>
        <div className={styles.colorEditor}>
          <div className={styles.inputColorLine}>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#dff6e8" }}
                className={styles.inputColor}
                onClick={() => setColor("#dff6e8")}
              ></div>
            </div>
            <div className={styles.inputColorContainer}>
              <input
                style={{ backgroundColor: "#bcc7f4" }}
                className={styles.inputColor}
                onClick={() => setColor("#bcc7f4")}
              />
            </div>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#bbf0f4" }}
                className={styles.inputColor}
                onClick={() => setColor("#bbf0f4")}
              />
            </div>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#dbf4b5" }}
                className={styles.inputColor}
                onClick={() => setColor("#dbf4b5")}
              ></div>
            </div>
          </div>
          <div className={styles.inputColorLine}>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#adf7b6" }}
                className={styles.inputColor}
                onClick={() => setColor("#adf7b6")}
              ></div>
            </div>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#FFEE93" }}
                className={styles.inputColor}
                onClick={() => setColor("#FFEE93")}
              ></div>
            </div>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#FFC09F" }}
                className={styles.inputColor}
                onClick={() => setColor("#FFC09F")}
              ></div>
            </div>
            <div className={styles.inputColorContainer}>
              <div
                style={{ backgroundColor: "#f4aed6" }}
                className={styles.inputColor}
                onClick={() => setColor("#f4aed6")}
              />
            </div>
          </div>
        </div>
        {color !== "" ? (
          <>
            <div className={styles.messageTitle}>
              <span className={styles.span}>2.</span>
              <p className={styles.p}>le message.</p>
            </div>
            <div className={styles.messageDescription}>
              <p>300 caractères max.</p>
            </div>
            <div className={styles.messageEditor}>
              <ReactQuill
                style={{
                  width: "100%",
                  minHeight: 200,
                  height: 300,
                  boxSizing: "border-box",
                  position: "relative",
                  //   border: "1px solid #ebebeb",
                  fontFamily: "Open Sans Medium",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 14,
                  backgroundColor: "white",
                }}
                theme="snow"
                modules={modules}
                onChange={onChange}
                value={value}
              />
            </div>
          </>
        ) : (
          ""
        )}

        {value && (
          <>
            <div className={styles.themeTitle}>
              <span className={styles.span}>3.</span>
              <p className={styles.p}>le thème.</p>
            </div>
            <div className={styles.themeDescription}>
              <select
                className={styles.themeSelect}
                name="themes"
                onChange={handleThemeChange}
                required
              >
                <option value="">--Sélectionnez un thème--</option>
                <option value="love">Amour 🥰</option>
                <option value="birthday">Anniversaire 🎂</option>
                <option value="noel">Noël 🎄</option>
                <option value="valentine">St Valentin 💘</option>
                <option value="funny">Pour le fun 😂 </option>
              </select>
            </div>
          </>
        )}

        {selectedTheme && (
          <>
            <div className={styles.imageTitle}>
              <span className={styles.span}>4.</span>
              <p className={styles.p}>l'image.</p>
            </div>
            <div className={styles.imageDescription}>
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
          </>
        )}
        {selectedImage && (
          <>
            <div className={styles.viewTitle}>
              <span className={styles.span}>5.</span>
              <p className={styles.p}>l'aperçu.</p>
            </div>
            <div className={styles.viewDescription}></div>
            <div className={styles.imageEditor}></div>
            <div className={styles.viewEditor}>
              {selectedImage && (
                <div
                  className={styles.card}
                  style={{
                    backgroundColor: color,
                    backgroundImage: "url(/images/bubbles.png)",
                    backgroundPosition: "center bottom",
                    backgroundSize: "cover",
                  }}
                  id="content"
                >
                  <img
                    src={selectedImage.urls.small}
                    alt=""
                    className={styles.cardImage}
                    onLoad={handleImageLoad}
                    style={{
                      border: "#3C98CC 1px solid",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "2rem",
                      background: "rgba(255, 255, 255, .5)",
                      padding: "2rem",
                      borderRadius: 10,
                    }}
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {selectedImage && (
          <>
            <div className={styles.uploadTitle}>
              <span className={styles.span}>6.</span>
              <p className={styles.p}>l'upload.</p>
            </div>
            <div className={styles.uploadDescription}>
              Récupérer votre Bubble Card !
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                className={styles.button}
                text="Upload"
                onClick={handleDownload}
              >
                Envoyer
              </Button>
            </div>
          </>
        )}
      </form>
      <div className={styles.img_wrapper}>
        <img
          className={styles.banner_img}
          src="/images/girlNdog2.png"
          alt="girl gum"
        />
      </div>
    </>
  );
};

export default Grid;
