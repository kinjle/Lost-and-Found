import axios from "axios";
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthHeader} from "react-auth-kit";

const LostItemForm = () =>{
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [securityQues, setSecurityQues] = useState("")
    const [itemImage, setItemImage] = useState("")

    const authHeader = useAuthHeader();

    
    const lostForm = () =>
    {
      const formData = new FormData()
      formData.append('itemName', itemName)
      formData.append('itemDescription', itemDescription)
      formData.append('securityQues', securityQues)
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
        console.log("postted")
    } 

    return (
      <div className="create">
        <h2>Post an item</h2>
        <div>
          <strong>Item Name:</strong> <input id="itemName" type="text"  onChange = {e => setItemName(e.target.value)}  /> <br />
          <strong>Item Description:</strong> <input id="itemDes" type="text" placeholder="Found in (area)" onChange = {e => setItemDescription(e.target.value)}/><br />
          
          <strong>Security Question:</strong> <input id="secQ" type="text" placeholder="Eg: What is the scratch?" onChange = {e => setSecurityQues(e.target.value)} /><br />
          <strong>Image:</strong> <input id="itemImage" type="file"  onChange = {e => setItemImage(e.target.files[0])}/> <br />
          <button type="submit" onClick={lostForm} >Post item</button><br />
        </div>
        <ToastContainer />
        <ToastContainer />
      </div>
    );

}

export default LostItemForm