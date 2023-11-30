import axios from "axios";
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthHeader} from "react-auth-kit";

const LostItemForm = () =>{
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [securityQues, setSecurityQues] = useState("")
    const [correspondingAnswer, setCorrespondingAnswer] = useState("")
    const [itemImage, setItemImage] = useState("")

    const authHeader = useAuthHeader();

    
    const lostForm = () =>
    {
      const formData = new FormData()
      formData.append('itemName', itemName)
      formData.append('itemDescription', itemDescription)
      formData.append('securityQues', securityQues)
      formData.append('correspondingAnswer',correspondingAnswer )
      formData.append('itemImage', itemImage)
      console.log(formData)
      
      axios({
        url: "http://localhost:3000/lostitemform",
        method: "POST",
        data: formData,
        headers: {
          "Authorization": authHeader()
        }
      })
        .then((response) => {
          console.log("Item posted!")
          console.log(response.data)
          toast.success("Item successfully posted!")
          window.location.href = 'http://localhost:3001/feed'
        })
        .catch((e) => {
          console.log("Error occured" +e );
          toast.error("Posting unsuccessful")
        });
        console.log("posted")
    } 

    return (
      <>
        <div className="lostFormContainer">
        <div className="lostFormContainer-child">
        <h2>Post An Item</h2>
        <div className="lostForm">
          <label>Item Name:</label> 
          <input id="itemName" type="text" required onChange = {e => setItemName(e.target.value)}  /> <br /> <br />


          <label>Item Description:</label> 
          <input id="itemDes" type="text" placeholder="Description of the time, place and status the item was found in" required onChange = {e => setItemDescription(e.target.value)}/><br /> <br />

          
          <label>Security Question:</label> 
          <input id="secQ" type="text" placeholder="Question related to the item" required onChange = {e => setSecurityQues(e.target.value)} /><br /> <br />

          <label>Corresponding Answer:</label> 
          <input id="secQ" type="text" placeholder="Answer the above question" required onChange = {e => setCorrespondingAnswer(e.target.value)} /><br /> <br />


          <label>Image:</label> 
          <input id="itemImage" type="file" required onChange = {e => setItemImage(e.target.files[0])}/> <br /> 


          <button className="postItemButton" type="submit" onClick={lostForm} >Post Item</button>
        </div>
        <ToastContainer />
        <ToastContainer />
      </div> 
      </div>
      </>
    );
}
export default LostItemForm