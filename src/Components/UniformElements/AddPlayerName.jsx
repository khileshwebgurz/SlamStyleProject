import React from "react";
import { useState, useEffect } from "react";

import allColors from "../../utils/colors.js";

const AddPlayerName = ({ onPlayerTemp, backTextPosition }) => {
  const [boldchecked, setBoldchecked] = useState(false);
  const handleBoldCheck = (e) => {
    setBoldchecked(e.target.checked);
  };

  const [italicCheck, setItalicCheck] = useState(false);
  const handleItalicCheck = (e) => {
    setItalicCheck(e.target.checked);
  };

  const [outlineCheck, setOutlineCheck] = useState(false);
  const handleOutlineCheck = (e) => {
    setOutlineCheck(e.target.checked);
  };

  // state for showing and hiding color palette
  const [showOutlineColors, setShowOutlineColors] = useState(false);
  // fir showing/hiding colors
  const toggleOutlineColors = () => {
    setShowOutlineColors(!showOutlineColors);
  };

  // state for storing selected color
  const [selectedOutlineColor, setSelectedOutlineColor] = useState("");

  // for handling selected color
  const handleOutlineColorSelection = (color) => {
    setSelectedOutlineColor(color);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // state for showing and hiding color palette
  const [showAllColors, setShowAllColors] = useState(false);
  // fir showing/hiding colors
  const toggleAllColors = () => {
    setShowAllColors(!showAllColors);
  };

  // state for storing selected color
  const [selectedColor, setSelectedColor] = useState("");

  // for handling selected color
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // state for select option for shapes
  const [shapeValue, setShapeValue] = useState("Straight");
  // shape array for all shapes
  const shapeArray = [
    "vertical-arc",
    "center-bulge",
    "bottom-vertical",
    "full-rev-arc",
    "half-asleep-arc",
    "inverse-vertical",
    "Straight",
    "san-diego",
    "breathing-in",
  ];
  // handling shapeValue to set shape
  const handleOptionChange = () => {
    setShapeValue(document.getElementById("shape1").value);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // state for selected font value from css
  const [fontValue, setFontValue] = useState("SS0");
  // storing all font
  const fontArray = [];
  for (let i = 0; i <= 401; i++) {
    fontArray.push(`SS${i}`);
  }
  // mapping my font value with the src url
  const [fontMapping, setFontMapping] = useState({});

  // handling fontchange
  const handleFontChange = () => {
    setFontValue(document.getElementById("font1").value);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // this useEffect is for loading my custom.js file
  useEffect(() => {
    // Dynamically load the custom.js script
    const script = document.createElement("script");
    script.src = "../../../public/custom.js";
    script.async = true;
    document.body.appendChild(script);

    // Remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // this useEffect is for reading my fonts.css file to excess font family and url value
  useEffect(() => {
    // Dynamically parse CSS font-face rules
    const styleSheets = Array.from(document.styleSheets);
    const fontMappingTemp = {};
    styleSheets.forEach((styleSheet) => {
      try {
        const cssRules = Array.from(styleSheet.cssRules);
        cssRules.forEach((rule) => {
          if (rule instanceof CSSFontFaceRule) {
            const fontFamily = rule.style.fontFamily.replace(/"/g, "");
            const fontSrc = rule.style.src.match(/url\("(.*)"\)/)[1];
            fontMappingTemp[fontFamily] = fontSrc;
          }
        });
      } catch (e) {
        console.log("Error accessing CSS rules:", e);
      }
    });
    setFontMapping(fontMappingTemp);
  }, [fontValue]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // this is handled when Apply button is clicked, it will call svgpathfunc from custom.js and
  // pass value dynamically from here

  const [playerText, setPlayerText] = useState("");

  useEffect(() => {
    if (playerText) {
      handlePlayerData();
    }
  }, [
    shapeValue,
    fontValue,
    boldchecked,
    italicCheck,
    outlineCheck,
    selectedOutlineColor,
    selectedColor,
  ]);

  const handlePlayerData = () => {
    const textInput = playerText;
    const textShape = shapeValue;
    const textFont = fontValue;

    window.svgpathfunc1(
      "back",
      textInput,
      outlineCheck,
      selectedOutlineColor,
      selectedColor,
      fontMapping[textFont]?.split("/").pop(),
      boldchecked,
      textShape,
      italicCheck
    );
  };

  useEffect(() => {
    const handlePlayerTemp = () => {
      onPlayerTemp(window.canvasTemp1);
    };

    window.addEventListener("canvasTemp1", handlePlayerTemp);

    return () => {
      window.removeEventListener("canvasTemp1", handlePlayerTemp);
    };
  }, [onPlayerTemp]);

  const handleReset = () => {
    backTextPosition({ left: 80, top: 70, scaleX: 1, scaleY: 1, angle: 0 });
  };

  return (
    <>
      <div className="text-style">
        <div className="answer">
          <div className="customize-prod-list scrollbar">
            <div className="wraper">
              <div className="name-number-row">
                <div className="name-number-col">
                  <div className="name-number-info full-width">
                    <div className="input-append field-input">
                      <label className="sklble">
                        Add Player Name
                        <a onClick={handleReset}>Reset</a>
                      </label>
                      <input
                        className="span2"
                        value={playerText}
                        id="player-string"
                        type="text"
                        style={{ color: "#fff" }}
                        onChange={(e) => setPlayerText(e.target.value)}
                        placeholder="add player name here..."
                      />

                      <button
                        id="add-text-string"
                        className="btn btn-submit fieldin"
                        title="Add text"
                        onClick={handlePlayerData}
                      >
                        Apply <i className="icon-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <select onChange={handleOptionChange} value={shapeValue} id="shape1">
              {shapeArray.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select onChange={handleFontChange} value={fontValue} id="font1">
              {fontArray.map((fontKey, id) => {
                const fontName = fontMapping[fontKey]
                  ? fontMapping[fontKey].split("/").pop().split(".")[0]
                  : fontKey;
                return (
                  <option
                    key={id}
                    value={fontKey}
                    style={{ fontFamily: fontKey }}
                  >
                    {fontName}
                  </option>
                );
              })}
            </select>
            <div style={{display: 'block'}}>
              <input
                type="button"
                className="toggle-colors-btn"
                onClick={toggleAllColors}
                style={{ height: "30px", width: "30px" }}
              /> Name Color
            </div>

            {showAllColors && (
              <div className="all-colors">
                <div className="color-row" style={{display:"block"}}>
                {allColors.map((color, index) => (
                  <input
                    type="button"
                    key={index}
                    style={{
                      backgroundColor: color,
                      height: "15px",
                      width: "15px",
                    }}
                    onClick={() => handleColorSelection(color)}
                  ></input>
                ))}
              </div>
              </div>
            )}
            <div className="labelMerge">
              <label htmlFor="bold"> Bold</label>
              <input id="bold" type="checkbox" onChange={handleBoldCheck} />
              </div>
              <div className="labelMerge">
              <label htmlFor="italic"> Italic</label>
              <input id="italic" type="checkbox" onChange={handleItalicCheck} />
              </div>
              <div className="labelMerge">
              <label htmlFor="outline"> Outline</label>
              <input id="outline" type="checkbox" onChange={handleOutlineCheck} />
              </div>
              <div style={{display: 'block'}}>
              <input
                type="button"
                className="toggle-colors-btn"
                onClick={toggleOutlineColors}
                style={{ height: "30px", width: "30px" }}
              />
</div>

            {showOutlineColors && (
              <div className="all-colors">
                {allColors.map((color, index) => (
                  <input
                    type="button"
                    key={index}
                    style={{
                      backgroundColor: color,
                      height: "15px",
                      width: "15px",
                    }}
                    onClick={() => handleOutlineColorSelection(color)}
                  ></input>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlayerName;
