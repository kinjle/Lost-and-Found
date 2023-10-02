import axios from "axios";
import React from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

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
            authState: {email: document.getElementById("userEmail").value}
          })
        ) {
          navigate("/mainfeed");
        } else {}
      })
      .catch((e) => {
        console.log("Error occured" + e);
      });
  };

  return (
    <div className="login">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        Email: <input id="userEmail" type="text" required /> <br />
        <br />
        Password: <input id="userPass" type="password" required />
        <br />
        <br />
        <button type="submit">Login</button>
        <br />
      </form>
    </div>
  );
};

export default Login;
