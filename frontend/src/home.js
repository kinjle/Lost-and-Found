import Navbar from "./navbar"
import image from "./assets/img/mainPicture.jpg"
import  styled from "styled-components";


const Home = () => {
    const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    margin: 0 1em;
    padding: 0.25em 1em;
    `  

    const Div = styled.div`
    `
    return ( 
        <div className="">
            <Div className="">
            <Navbar />
                  {/* <img src={image} style={{ width: "90%", height: "100%" }} alt="people searching"/> */}
            </Div>
        </div>
     );
}

export default Home;