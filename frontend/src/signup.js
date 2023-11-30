import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import mainPicture from './assets/img/background2.png'

const Create = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  function signup() {
    const payload = {
      fullname: document.getElementById("fname").value,
      username: document.getElementById("uname").value,
      email: document.getElementById("userEmail").value,
      password: document.getElementById("userPass").value,
      phoneNumber: document.getElementById("userNum").value,
      inputOtp: document.getElementById("otp").value,
    };
    console.log(payload);

    axios({
      url: "http://localhost:3000/auth/signup",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        console.log("sign up success");
        console.log(response.data);
        toast.success("Account successfully created!");
      })
      .catch((e) => {
        console.log("Error occured" + e);
        toast.error("Signup unsuccessful");
      });
  }

  function handleOTP() {
    const email = document.getElementById("userEmail").value;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailPattern.test(email)) {
      axios({
        url: "http://localhost:3000/auth/sendOtp",
        method: "POST",
        data: { email: document.getElementById("userEmail").value },
      })
        .then((response) => {
          console.log("otp sent");
          setIsOtpSent(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log("Error occured" + e);
        });
    } else alert("invalid email");
  }

  return (
    <>
      <div className="signupcontainer">
        <div className="signupcontainer-child signupcontainer-child-1">
          <img src={mainPicture} alt="" />
        </div>

        <div className="signupcontainer-child signupcontainer-child-2">
          <div className="signuprightcontainer">
            <div className="createAccForm">
              <h2>Create A New Account</h2> <br />

              <div className="formcontainer">
                <div className="form"> 
                <label >Full name: </label> <br />
                <input id="fname" type="text" /><br /> <br />

                <label >Username: </label> <br /> 
                 <input id="uname" type="text" /> <br /> <br />

                <label >Email: </label> <br /> 
                 <input id="userEmail" type="email" /> <br /> <br />
 
                <button
                  className="sendOtpButton"
                  type="submit"
                  onClick={handleOTP}
                >
                  Send OTP
                </button>{" "}
                <br /> 


                {/* IN CASE OF ERROR SET visibility: "hidden" */}
                <label style={{ display: "none" }}>Invalid Email</label>  
                {isOtpSent && (
                  <>
                    <label >Enter OTP: </label> <input id="otp" type="text" />
                    <br /> <br />
                  </>
                )}


                <label className="phonelabel">Phone Number:{" "}</label> <br />
                <input id="userNum" type="text" pattern="^\d{10}$" /><br /> <br />

                <label >Password: </label> <br /> 
                <input id="userPass" type="password" />
                <br /> <br />

                <button className="submitButton" type="submit" onClick={signup}>
                  Submit
                </button>
                <br />
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
