import React, { useState,useEffect } from "react";
export const Steps = ({ gettingdata, activeStateProp }) => {
  const [activeState, setActiveState] = useState(1);

  useEffect(() => {
    setActiveState(activeStateProp);
  }, [activeStateProp]);

  const handleStepClick = (step) => {
    if (step > 1 && activeState === 1) {
      // Prevent navigation to Customize or Finalize if current step is Select
      return;
    }
    else if(step>2 && activeState==2){
      return
    }
    gettingdata(step);
    setActiveState(step);
  };


  return (
    <>
      <ul id="uniform-tabs-nav" className="list-unstyled">
        <li className={`navone ${activeState === 1 ? "active" : ""}`}>
          <a onClick={() => handleStepClick(1)}>
            
            <div className="step-tab">
              <h3 className="step-tab-name-mob">Select</h3>
            </div>
          </a>
        </li>
        <li className={`navtwo ${activeState === 2 ? "active" : ""} ${activeState === 1 ? "disabled" : ""}`}>
          <a onClick={() => handleStepClick(2)}>
           
            <div className="step-tab">
              <h3 className="step-tab-name-mob">Customize</h3>
            </div>
          </a>
        </li>
        <li className={`navthree ${activeState === 3 ? "active" : ""} ${activeState === 1 ? "disabled" : ""} ${
          activeState===2 ?"disabled":""
        } `}>
          <a onClick={() => handleStepClick(3)}>
            <div className="step-tab">
              <h3 className="step-tab-name-mob">Finalize</h3>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};
