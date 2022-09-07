import React, { useContext, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import FirebaseContext from "../Firebase/Context";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const firebase = useContext(FirebaseContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(`Consulter votre email ${email}pour changer le mdp`);
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };
  const disabled = email === "" ? "disabled" : null;
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#ffffff",
                }}
              >
                {success}
              </span>
            )}

            {error && <span>{error.message}</span>}
            <h2>Mot de passe oublié ?</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <button disabled={disabled}>Récupérer</button>
            </form>
            <hr style={{ border: "dashed 1px gray" }} />
            <div className="link">
              <NavLink className={"simpleLink"} to="/login">
                Déja inscrit Connecter-vous!
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
