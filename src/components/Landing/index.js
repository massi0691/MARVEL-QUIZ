import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
const Landing = () => {
  const refWolverine = useRef(null);
  const [btn, setBtn] = useState(false);

  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
  };
  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  };

  const clearImg = () => {
    if (refWolverine.current.classList.contains("leftImg")) {
      refWolverine.current.classList.remove("leftImg");
    } else if (refWolverine.current.classList.contains("rightImg"))
      refWolverine.current.classList.remove("rightImg");
  };

  const displayBtn = btn && (
    <>
      <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
        <NavLink to="/signup" className="btn-welcome">
          Inscription
        </NavLink>
      </div>
      <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
        <NavLink to="/login" className="btn-welcome">
          Connexion
        </NavLink>
      </div>
    </>
  );

  useEffect(() => {
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []);

  return (
    <main ref={refWolverine} className="welcomePage">
      {displayBtn}
    </main>
  );
};

export default Landing;
