import React from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">
          Question: {`${idQuestion + 1}/${maxQuestions}`}
        </div>
        <div className="progressPercent">
          Progression: {`${(idQuestion + 1) * maxQuestions} %`}
        </div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={
            maxQuestions
              ? { width: `${(idQuestion + 1) * 10}%` }
              : { width: `${(maxQuestions - 1) * 100}%` }
          }
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
