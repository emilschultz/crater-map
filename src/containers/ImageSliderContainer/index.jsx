import React from "react";
import craterAfter from "../../images/meteor-crater-after.jpg";
import craterBefore from "../../images/meteor-crater-before.jpg";
import ImageSliderSection from "../../components/ImageSliderSection";

const ImageSliderContainer = () => {
  return (
    <ImageSliderSection>
      <div className="container">
        <div className="image-container-after">
          <img className="after" src={craterAfter} alt="The Barringer crater" />
        </div>
        <div className="image-container-before">
          <img className="before" src={craterBefore} alt="The arizona desert" />
        </div>
        <div className="slider"> </div>
      </div>
    </ImageSliderSection>
  );
};

export default ImageSliderContainer;
