import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../Firebase/Context";
import ReactTooltip from "react-tooltip";

const Logout = () => {
  const firebase = useContext(FirebaseContext);

  const [checked, setChecked] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (checked) {
      console.log("déconnexion");
      firebase.signoutUser();

      navigate("/");
    }
  }, [checked, firebase, navigate]);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <ReactTooltip place="left" effect="solid" />
    </div>
  );
};

export default Logout;
