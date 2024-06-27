import React from "react";
import { useState, useEffect } from "react";
import allColors from "../../utils/colors.js";

const AddText = ({ onCanvasTemp, txtPosition }) => {
  const [boldchecked, setBoldchecked] = useState(false);
  const handleBoldCheck = (e) => setBoldchecked(e.target.checked);

  const [italicCheck, setItalicCheck] = useState(false);
  const handleItalicCheck = (e) => setItalicCheck(e.target.checked);

  const [outlineCheck, setOutlineCheck] = useState(false);
  const handleOutlineCheck = (e) => setOutlineCheck(e.target.checked);

  const [showOutlineColors, setShowOutlineColors] = useState(false);
  const toggleOutlineColors = () => setShowOutlineColors(!showOutlineColors);

  const [selectedOutlineColor, setSelectedOutlineColor] = useState("");
  const handleOutlineColorSelection = (color) => setSelectedOutlineColor(color);
  const closeAllColors = () => setShowAllColors(false);

  const [inputText, setInputText] = useState("");

  const [showAllColors, setShowAllColors] = useState(false);
  const toggleAllColors = () => setShowAllColors(!showAllColors);

  const [selectedColor, setSelectedColor] = useState("");
  const handleColorSelection = (color) => setSelectedColor(color);

  const [shapeValue, setShapeValue] = useState("Straight");
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
  const handleOptionChange = () =>
    setShapeValue(document.getElementById("shape").value);

  const [fontValue, setFontValue] = useState("SS0");
  const fontArray = Array.from({ length: 402 }, (_, i) => `SS${i}`);
  const [fontMapping, setFontMapping] = useState({});

  const handleFontChange = () =>
    setFontValue(document.getElementById("font").value);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../../../public/custom.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (inputText) {
      handlegettingData();
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

  const handlegettingData = () => {
    const textInput = inputText;
    const textShape = shapeValue;
    const textFont = fontValue;

    window.svgpathfunc(
      "front",
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
    const handleCanvasTemp = () => {
      onCanvasTemp(window.canvasTemp);
    };

    window.addEventListener("canvasTemp", handleCanvasTemp);

    return () => {
      window.removeEventListener("canvasTemp", handleCanvasTemp);
    };
  }, [onCanvasTemp]);

  const handleReset = () => {
    txtPosition({ left: 50, top: 50, scaleX: 1, scaleY: 2, angle: 0 });
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
                        Add Team Name
                        <a onClick={handleReset}>Reset</a>
                      </label>
                      <input
                        className="span2"
                        value={inputText}
                        id="text-string"
                        type="text"
                        style={{ color: "#fff" }}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="add player number here..."
                      />

                      <button
                        id="add-text-string"
                        className="btn btn-submit fieldin"
                        title="Add text"
                        onClick={handlegettingData}
                      >
                        Apply <i className="icon-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <select onChange={handleOptionChange} value={shapeValue} id="shape">
              {shapeArray.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select onChange={handleFontChange} value={fontValue} id="font">
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
            <div style={{ display: "block" }}>
              <input
                type="button"
                className="toggle-colors-btn"
                onClick={toggleAllColors}
                style={{ height: "30px", width: "30px" }}
              />{" "}
              Name Color
              {showAllColors && (
                <button onClick={closeAllColors} style={{ marginLeft: "10px" }}>
                  &times;
                </button>
              )}
            </div>

            {showAllColors && (
              <div className="all-colors">
                <div className="color-row" style={{ display: "block" }}>
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
              <input
                id="outline"
                type="checkbox"
                onChange={handleOutlineCheck}
              />
            </div>
            <div style={{ display: "block" }}>
              <input
                type="button"
                className="toggle-colors-btn"
                onClick={toggleOutlineColors}
                style={{ height: "30px", width: "30px" }}
              />
            </div>
            {showOutlineColors && (
              <div className="all-colors">
                <div className="color-row">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddText;
