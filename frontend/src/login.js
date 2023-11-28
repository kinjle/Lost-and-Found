import axios from "axios";
import React from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import "./index.css";
import mainPicture from "./assets/img/background3.png";

const Login = (props) => {
  const signIn = useSignIn();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: document.getElementById("userEmail").value,
      password: document.getElementById("userPass").value,
    };
    console.log(payload);

    axios({
      url: "http://localhost:3000/auth/login",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        if (
          signIn({
            token: response.data.token,
            expiresIn: response.data.exp,
            tokenType: "Bearer",
            authState: { email: document.getElementById("userEmail").value },
          })
        ) {
          navigate("/mainfeed");
        } else {
        }
      })
      .catch((e) => {
        console.log("Error occured" + e);
      });
  };

  return (
    <>
      <div className="loginPageContainer">
        <div className="loginPagecontainer-child loginPagecontainer-child-1">
          <img src={mainPicture} alt="" />
        </div>

        <div className="loginPagecontainer-child loginPagecontainer-child-2">
          <div className="loginRightContainer">
            <h2>LogIn To Your Account </h2>

            <div className="loginForm">
              <form onSubmit={handleSubmit}>
                <br /><label>Email: </label> <br />
                <input id="userEmail" type="text" required /> <br />
                <br />
                <label>Password: </label> <br />
                <input id="userPass" type="password" required />
                <br />
                <br /> <br />
                <button className="loginPageButton" type="submit">
                  Login
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
