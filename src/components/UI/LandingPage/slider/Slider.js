import SimpleImageSlider from "react-simple-image-slider";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const images = [
  { url: "Slideimg/R1.jpg" },
  { url: "Slideimg/R2.jpg" },
  { url: "Slideimg/R3.jpg" },
  { url: "Slideimg/R4.jpg" },
  { url: "Slideimg/R5.jpg" },
  { url: "Slideimg/R6.jpg" },
  { url: "Slideimg/R7.jpg" },
  { url: "Slideimg/R8.jpg" },
  { url: "Slideimg/R9.jpg" },
];

const Slider = () => {
  return (
    <ParallaxProvider>
      <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
        <div>
          <SimpleImageSlider
            width={"100%"}
            height={384}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        </div>
      </Parallax>
    </ParallaxProvider>
  );
};
export default Slider;
