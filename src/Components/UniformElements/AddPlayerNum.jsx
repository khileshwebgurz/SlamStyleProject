import React from "react";
import { useState, useEffect } from "react";

import allColors from "../../utils/colors.js";

const AddPlayerNum = ({ getNumValue, numPosition, backNumPosition }) => {
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [numValue, setNumValue] = useState("");

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [boldchecked2, setBoldchecked2] = useState(false);
  const handleBoldCheck2 = (e) => {
    setBoldchecked2(e.target.checked);
  };

  const [italicCheck2, setItalicCheck2] = useState(false);
  const handleItalicCheck2 = (e) => {
    setItalicCheck2(e.target.checked);
  };

  const [outlineCheck2, setOutlineCheck2] = useState(false);
  const handleOutlineCheck2 = (e) => {
    setOutlineCheck2(e.target.checked);
  };

  // state for showing and hiding color palette
  const [showOutlineColors2, setShowOutlineColors2] = useState(false);
  // fir showing/hiding colors
  const toggleOutlineColors2 = () => {
    setShowOutlineColors2(!showOutlineColors2);
  };

  // state for storing selected color
  const [selectedOutlineColor2, setSelectedOutlineColor2] = useState("");

  // for handling selected color
  const handleOutlineColorSelection2 = (color) => {
    setSelectedOutlineColor2(color);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // state for showing and hiding color palette
  const [showAllColors2, setShowAllColors2] = useState(false);
  // fir showing/hiding colors
  const toggleAllColors2 = () => {
    setShowAllColors2(!showAllColors2);
  };

  // state for storing selected color
  const [selectedColor2, setSelectedColor2] = useState("");

  // for handling selected color
  const handleColorSelection2 = (color) => {
    setSelectedColor2(color);
  };

  // state for selected font value from css
  const [fontValue2, setFontValue2] = useState("SS0");
  // storing all font
  const fontArray = [];
  for (let i = 0; i <= 401; i++) {
    fontArray.push(`SS${i}`);
  }
  // mapping my font value with the src url
  const [fontMapping2, setFontMapping2] = useState({});

  // handling fontchange
  const handleFontChange2 = () => {
    setFontValue2(document.getElementById("font2").value);
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
    setFontMapping2(fontMappingTemp);
  }, [fontValue2]);

  useEffect(() => {
    if (numValue) {
      handlegettingNum();
    }
  }, [
    fontValue2,
    boldchecked2,
    italicCheck2,
    outlineCheck2,
    selectedOutlineColor2,
    selectedColor2,
  ]);

  const handlegettingNum = () => {
    const textInput = document.getElementById("text-num").value;

    const textFont = fontValue2;

    window.svgpathfunc2(
      "front",
      textInput,
      outlineCheck2,
      selectedOutlineColor2,
      selectedColor2,
      fontMapping2[textFont]?.split("/").pop(),
      boldchecked2,
      "Straight",
      italicCheck2
    );
  };

  useEffect(() => {
    const handleCanvasTemp = () => {
      getNumValue(window.canvasTemp2);
    };

    window.addEventListener("canvasTemp2", handleCanvasTemp);

    return () => {
      window.removeEventListener("canvasTemp2", handleCanvasTemp);
    };
  }, [getNumValue]);

  const handleReset2 = () => {
    numPosition({ left: 200, top: 100, scaleX: 0.7, scaleY: 0.7, angle: 0 });
    backNumPosition({ left: 130, top: 150, scaleX: 2, scaleY: 2, angle: 0 });
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
                        Add Player Number (Only digits)
                        <a onClick={handleReset2}>Reset</a>
                      </label>
                      <input
                        className="span2"
                        value={numValue}
                        id="text-num"
                        type="number"
                        style={{ color: "#fff" }}
                        onChange={(e) => setNumValue(e.target.value)}
                        placeholder="add player number here..."
                      />

                      <button
                        id="add-text-string"
                        className="btn btn-submit fieldin"
                        title="Add text"
                        onClick={handlegettingNum}
                      >
                        Apply <i className="icon-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <select onChange={handleFontChange2} value={fontValue2} id="font2">
              {fontArray.map((fontKey, id) => {
                const fontName = fontMapping2[fontKey]
                  ? fontMapping2[fontKey].split("/").pop().split(".")[0]
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
                onClick={toggleAllColors2}
                style={{ height: "30px", width: "30px" }}
              />{" "}
              Name Color
            </div>

            {showAllColors2 && (
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
                      onClick={() => handleColorSelection2(color)}
                    ></input>
                  ))}
                </div>
              </div>
            )}
            <div className="labelMerge">
              <label htmlFor="bold"> Bold</label>
              <input id="bold" type="checkbox" onChange={handleBoldCheck2} />
            </div>
            <div className="labelMerge">
              <label htmlFor="italic"> Italic</label>
              <input
                id="italic"
                type="checkbox"
                onChange={handleItalicCheck2}
              />
            </div>
            <div className="labelMerge">
              <label htmlFor="outline"> Outline</label>
              <input
                id="outline"
                type="checkbox"
                onChange={handleOutlineCheck2}
              />
            </div>
            <div style={{ display: "block" }}>
              <input
                type="button"
                className="toggle-colors-btn"
                onClick={toggleOutlineColors2}
                style={{ height: "30px", width: "30px" }}
              />
            </div>

            {showOutlineColors2 && (
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
                      onClick={() => handleOutlineColorSelection2(color)}
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

export default AddPlayerNum;
