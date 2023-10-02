import axios from "axios";
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {

  const [isOtpSent, setIsOtpSent] = useState(false)
  function signup() {
    
    const payload = {
      fullname: document.getElementById("fname").value,
      username: document.getElementById("uname").value,
      email: document.getElementById("userEmail").value,
      password: document.getElementById("userPass").value,
      phoneNumber: document.getElementById("userNum").value,
      inputOtp: document.getElementById("otp").value,
    };
    console.log(payload)

    axios({
      url: "http://localhost:3000/auth/signup",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        console.log("sign up success")
        console.log(response.data)
        toast.success("Account successfully created!")
      })
      .catch((e) => {
        console.log("Error occured" +e );
        toast.error("Signup unsuccessful")
      });
  }

  function handleOTP(){
    const email = document.getElementById("userEmail").value;
    const emailPattern= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if(emailPattern.test(email))
    {
      axios({
        url: "http://localhost:3000/auth/sendOtp",
        method: "POST",
        data: {email: document.getElementById("userEmail").value}
      })
        .then((response) => {
          console.log("otp sent")
          setIsOtpSent(true)
          console.log(response.data)
        })
        .catch((e) => {
          console.log("Error occured" +e );
        });
    }
    else alert ("invalid email")
  }

  return (

    <div className="create">
      <h2>Create a new account</h2>
      <div>
      Full name: <input id="fname" type="text"  /><br />
        Username: <input id="uname" type="text"  /><br />
        Email: <input id="userEmail" type="email"  /> <button type="submit" onClick={handleOTP}>Send OTP</button> <br /> <br />
        <label style={{visibility: "hidden"}}>Invalid Email</label>
        {isOtpSent && <>OTP: <input id="otp" type="text" /><br /></>}
        
        Phone Number: <input id="userNum" type="text" pattern="^\d{10}$" /><br />
        Password: <input id="userPass" type="text" /><br />
      
        <button type="submit" onClick={signup} >Submit</button><br />
      </div>
      <ToastContainer />
    </div>
  );
}
 
export default Create;