import { useState,useRef } from "react";
import "./assets/css/style.css";
import "./assets/css/app.css";
import "./App.css";
import '../public/fonts.css'
import { Steps } from "./Components/Steps.jsx";
import UniformList from "./Components/UniformList";
import CustomisableUniformSlices from "./Components/CustomisableUniformSlices.jsx";
import FinalForm from "./Components/FinalForm.jsx";
function App() {
  const [stepIdData, SetStepIdData] = useState(1);

  const StepData = (stepId) => {
    SetStepIdData(stepId);
  };

  const handleJerseySelect = () => {
    SetStepIdData(2);
  };

  const jerseyFrontRef = useRef(null);
  const jerseyBackRef = useRef(null);
  const jerseyLeftRef = useRef(null);
  const jerseyRightRef = useRef(null);

  function navigateToFinalForm() {
    jerseyFrontRef.current.captureCanvas().then((result) => {
      localStorage.setItem("front", result);
    });

    jerseyBackRef.current.captureCanvas().then((result) => {
      localStorage.setItem("back", result);
    });

    jerseyLeftRef.current.captureCanvas().then((result) => {
      localStorage.setItem("left", result);
    });

    jerseyRightRef.current.captureCanvas().then((result) => {
      localStorage.setItem("right", result);
    });

    SetStepIdData(3);
  }

  return (
    <>
      <section className="custom-uniform">
        <div className="uniform-wrapper">
          <div className="container">
            <div className="uniform-inner">
              <div className="uniform-tabs">
              <Steps gettingdata={StepData} activeStateProp={stepIdData} />
                {stepIdData === 1 && <UniformList  onJerseySelect={handleJerseySelect} />}
                {stepIdData === 2 && <CustomisableUniformSlices
                navigateToFinalForm={navigateToFinalForm}
                jerseyFrontRef={jerseyFrontRef}
                jerseyBackRef={jerseyBackRef}
                jerseyLeftRef={jerseyLeftRef}
                jerseyRightRef={jerseyRightRef}
                />}
                {stepIdData === 3 && <FinalForm/>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
