// import Navbar from "./navbar.js";
import Login from "./login.js";
import Create from "./signup.js";
import Home from "./home.js";
import Feed from "./feed.js";
import LostItemForm from "./lostForm.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import MainFeed from "./mainFeed.js";
import ClaimedItems from "./claimedItems.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/signup" element={<Create />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/feed" element={<Feed />} exact />
          <Route path="/mainfeed" element={<MainFeed />} exact />
          <Route path="/claimeditems" element={<ClaimedItems />} exact />
          <Route path="/lostitemform" element={<LostItemForm />} exact />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <ToastContainer />
    </>
  );
}
export default App;