import React, { useState, useContext } from "react";
import FirebaseContext from "../Firebase/Context";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const firebase = useContext(FirebaseContext);

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    firebase
      .signupUser(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid, pseudo, email);
      })
      .then(() => {
        setLoginData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const { pseudo, email, password, confirmPassword } = loginData;

  const btnSubmit =
    pseudo === "" || email === "" || password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  // gestion des erreurs
  const errorMessage = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMessage}
            <h2>Incription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="text"
                  id="pseudo"
                  required
                  autoComplete="off"
                  value={pseudo}
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  required
                  autoComplete="off"
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  required
                  autoComplete="off"
                  value={password}
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  type="password"
                  id="confirmPassword"
                  required
                  autoComplete="off"
                  value={confirmPassword}
                />
                <label htmlFor="confirmPassword">
                  Confirmer le Mot de passe
                </label>
              </div>
              {btnSubmit}
            </form>
            <hr style={{ border: "dashed 1px gray" }} />
            <div className="link">
              <NavLink className={"simpleLink"} to="/login">
                {" "}
                Déja inscrit ? Connectez-vous!
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
