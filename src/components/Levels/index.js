import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal/lib/Stepper";

const Levels = ({ level, quizLevel }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizSteps = level.map((lev) => ({ title: lev.toUpperCase() }));
    setLevels(quizSteps);
  }, [level]);
  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={levels}
        activeStep={quizLevel}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"#E0E0E0"}
        defaultTitleColor={"#E0E0E0"}
        completeColor={"#E0E0E0"}
        completeBarColor={"#E0E0E0"}
        barStyle={"dashed"}
        size={45}
        circleFontSize={20}
        defaultBorderWidth={10}
      />
    </div>
  );
};

export default React.memo(Levels);
