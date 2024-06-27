import Neck from "./UniformElements/Neck.jsx";
import NeckImgeList from "./UniformStore/NeckStore.jsx";
import Shoulder from "./UniformElements/Shoulder.jsx";
import JerseyCustomisableData from "../utils/jerseyCustomisableData.js";
import ShoulderStore from "./UniformStore/ShoulderStore.jsx";
import Index from "../Components/index.jsx";
import Vtype from "./UniformElements/Vtype.jsx";
import Color from "./UniformElements/Color.jsx";
import Canvas from "./UniformElements/Canvas.jsx";

import AddImages from "./UniformElements/AddImages.jsx";

import { useState,useEffect } from "react";
import AddTeam from "./UniformElements/AddTeam.jsx";

export default function CustomisableUniformSlices({
  navigateToFinalForm,
  jerseyFrontRef,
  jerseyBackRef,
  jerseyLeftRef,
  jerseyRightRef,
}) {
  const ShoulderImages = ShoulderStore(); 

  const jersyNum = localStorage.getItem("selectedJersy");

  const jerseyData = JerseyCustomisableData[jersyNum];

  const vleftside = `assets/jerseys/${jersyNum}/slicings/crew_leftside.png`;
  const vrightside = `assets/jerseys/${jersyNum}/slicings/crew_rightside.png`;
  const noVLeftSide = `assets/jerseys/${jersyNum}/slicings/crew_noV_leftside.png`;
  const noVRightSide = `assets/jerseys/${jersyNum}/slicings/crew_noV_rightside.png`;

 
  const [openAccordion, setOpenAccordion] = useState("");

  useEffect(() => {
    if (window.innerWidth > 960) {
      setOpenAccordion("neck-style-layer");
    }
  }, []);

  const isMobileView = window.innerWidth <= 960;

  // Function to handle accordion toggle
  const handleAccordionToggle = (accordionName) => {
    setOpenAccordion(openAccordion === accordionName ? "" : accordionName);
  };
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // state for selected Neck Options
  const [selectedNeckImage, setSelectedNeckImage] = useState({
    NeckImg: NeckImgeList[jerseyData.neck_style - 1].src,
    NeckClr: NeckImgeList[jerseyData.neck_style - 1].clrImg1,
    NeckImgShd: NeckImgeList[jerseyData.neck_style - 1].shd,
    NeckId: NeckImgeList[jerseyData.neck_style - 1].id,
  });

  // callback function for getting selected neck from options
  const handleNeckImageSelect = (NeckData) => {
    setSelectedNeckImage(NeckData);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // state for selected shoulder Image
  const [selectedShoulderImage, setSelectedShoulderImage] = useState({
    frontassociate: ShoulderImages[0].frontassociate,
    backassociate: ShoulderImages[0].backassociate,
  });

  // callback function for getting selected shoulder from option
  const handleShoulderImageSelect = (shoulderImage) => {
    setSelectedShoulderImage(shoulderImage);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // state for cut or no cut image
  const [selectedCutorNoCut, setSelectedCutorNoCut] = useState({
    left: noVLeftSide,
    right: noVRightSide,
  });

  const handleVorNoVImageSelect = (type) => {
    if (type === "v") {
      setSelectedCutorNoCut({ left: vleftside, right: vrightside });
    } else if (type === "noV") {
      setSelectedCutorNoCut({ left: noVLeftSide, right: noVRightSide });
    }
  };

  // state for jersey component to color them
  const [shapeColor, setShapeColor] = useState({
    shirt1: jerseyData.mc,
    shirt2: jerseyData.stc,
    shirt3: jerseyData.sl2,
    shirt4: jerseyData.sl3,
    shirt5: jerseyData.sl4,
    shirt6: jerseyData.sl5,
    shirt7: jerseyData.sl6,
    shirt8: jerseyData.sl7,
    shirt9: "#f88f37",
    shirt10: "#b54235",
    neck1: jerseyData.cc,
    neck2: jerseyData.clc,
    shoulder1: jerseyData.sc,
    shoulder2: jerseyData.cl2,
  });

  // callback function for getting selected color from child component
  const handleColorSelect = (color, area) => {
    // Update only the specific area's color while keeping others unchanged
    setShapeColor((prevColors) => ({
      ...prevColors,
      [area]: color,
    }));
  };

  // callback function for getting images from its child element
  const [image, setImage] = useState();
  const handleGetImages = (images) => {
    setImage(images);
  };

  const [canvasTemp, setCanvasTemp] = useState(null);

  const handleCanvasTemp = (newCanvasTemp) => {
    setCanvasTemp(newCanvasTemp);
  };

  const [numVal, setNumVal] = useState('')
  const handleGetNumValue =(numValue)=>{
    setNumVal(numValue)
  }
  const [player, setPlayer] = useState(null);
  const handlePlayerTemp = (playerVal) => {
    setPlayer(playerVal);
  };

  const [textPosition, setTextPosition] = useState({
    left: 80,
    top: 150,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
  });

  const handleTxtPosition = (value)=>{
    setTextPosition(value)
  }

  const [playerNum, setPlayerNum] = useState({
    left: 200,
    top: 100,
    scaleX: 0.7,
    scaleY: 0.7,
    angle: 0,
  })

  const handleNumPosition=(value)=>{
    setPlayerNum(value)
  }

  const [backNum, setBackNum] = useState({
    left: 100,
    top: 150,
    scaleX: 1.5,
    scaleY: 1.5,
    angle: 0,
  })

  const handleBackNumPosition=(value)=>{
    setBackNum(value)
  }

  const [backText, setBackText] = useState({
    left: 80,
    top: 70,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
  })

  const handleBackTextPosition =(value)=>{
    setBackText(value)
  }

  return (
    <>
    
      <Index />
      <div id="" className="customize-uniform">
      <div
          id="customize-uniform_here"
          className="customize-layout flex-row fosCls"
        >
          <div className="customize-option">
            <ul className="accordion-list list-unstyled">
            <Neck
                onNeckSelect={handleNeckImageSelect}
                isOpen={openAccordion === "neck-style-layer"}
                onAccordionToggle={() => handleAccordionToggle("neck-style-layer")}
              />
              <Shoulder
                onShoulderSelect={handleShoulderImageSelect}
                isOpen={openAccordion === "shoulder-type-layer"}
                onAccordionToggle={() => handleAccordionToggle("shoulder-type-layer")}
              />
              <Vtype onImageSelect={handleVorNoVImageSelect}
              isOpen={openAccordion==="choose-v-layer"} onAccordionToggle={()=> handleAccordionToggle("choose-v-layer")} />
              <Color
                onColorSelect={handleColorSelect}
                selectedNeckId={selectedNeckImage.NeckId}
                shapeColor={shapeColor}
                isOpen={openAccordion==="color-uniform-layer"} onAccordionToggle={()=> handleAccordionToggle("color-uniform-layer")}
              />
              <AddTeam   onCanvasTemp={handleCanvasTemp}
                onPlayerTemp={handlePlayerTemp}
                getNumValue={handleGetNumValue}
                txtPosition={handleTxtPosition}
                numPosition={handleNumPosition}
                backNumPosition={handleBackNumPosition}
                backTextPosition={handleBackTextPosition}
              isOpen={openAccordion==="text-style-layer"} onAccordionToggle={()=>handleAccordionToggle("text-style-layer")}
              />

              <AddImages gettingImages={handleGetImages}
              isOpen={openAccordion==="add-images-layer"}
              onAccordionToggle={()=>handleAccordionToggle("add-images-layer")}
              />
            </ul>
          </div>
          <Canvas
            canvasTemp={canvasTemp}
            shapeColor={shapeColor}
            selectedNeckImage={selectedNeckImage}
            selectedShoulderImage={selectedShoulderImage}
            selectedCutorNoCut={selectedCutorNoCut}
            selectedImage={image}
            numVal={numVal}
            navigateToFinalForm={navigateToFinalForm}
            player={player}
            jerseyFrontRef={jerseyFrontRef}
            jerseyBackRef={jerseyBackRef}
            jerseyLeftRef={jerseyLeftRef}
            jerseyRightRef={jerseyRightRef}
            textPosition={textPosition}
            setTextPosition={setTextPosition}
            playerNum={playerNum}
            setPlayerNum={setPlayerNum}
            backNum={backNum}
            setBackNum={setBackNum}
            backText={backText}
            setBackText={setBackText}
          />
        </div>
      </div>
    </>
  );
}
