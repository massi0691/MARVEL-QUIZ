import React, { useState, useContext, useEffect } from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import FirebaseContext from "../Firebase/Context";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Welcome = () => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const firebase = useContext(FirebaseContext);
  let navigate = useNavigate();
  useEffect(() => {
    let listner = firebase.onAuthStateChanged(setUserSession, navigate);
    if (!!userSession) {
      firebase
        .getDoc(userSession.uid)
        .then((docSnep) => {
          if (docSnep && docSnep.exists) {
            const myData = docSnep.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listner = null;
    };
  }, [userSession]);
  return userSession === null ? (
    <Loader loadingMsg={"Loading..."} styling={{ textAlign: "center" }} />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
