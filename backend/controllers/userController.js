const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const createToken = (_id) => {
  return jwt.sign({ _id }, "my_secret_key", { expiresIn: "3d" });
};

otp = "";

//----------------------login user---------------------
const logInUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);
    const { exp } = jwt.decode(token);
    res.status(200).json({ email, token, exp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

function triggerOTP(email) {
  let MailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kinjle.nepal@deerwalk.edu.np",
      pass: "avuhhlyehlwukilv",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let MailOptions = {
    from: "kinjle.nepal@deerwalk.edu.np",
    to: email, //replace this with email
    subject: "OTP for Lost and Found",
    text: `Your OTP is: ${otp}`,
  };

  MailTransporter.sendMail(MailOptions, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email Sent");
    }
  });
}

function generateOTP() {
  return randomstring.generate({
    length: 6, // Change the length as per your requirements
    charset: "numeric",
  });
}

const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    console.log(email);
    otp = generateOTP();
    console.log(otp);
    triggerOTP(email);

    res.status(200).json({ msg: "Otp Sent. Please check your mail." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

function validateOTP(val) {
  console.log(otp);
  console.log(val);
  return otp == val;
}

//------------------signup user-----------------------------
const signupUser = async (req, res) => {
  const { email, password, fullname, phoneNumber, username, inputOtp } =
    req.body;
  try {
    console.log(req.body);

    isOTPCorrect = validateOTP(inputOtp);
    console.log(isOTPCorrect);
    if (isOTPCorrect) {
      const user = await User.signup(
        fullname,
        username,
        email,
        password,
        phoneNumber
      );

      //create token
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } else {
      res.status(400).json({ msg: "Otp Invalid" });
      alert("Invalid OTP");
      console.log("wrong otp")
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, logInUser, sendOtp };
