import Navbar from "./navbar"
import image from "./assets/img/mainPicture.jpg"

const Home = () => {
    return ( 
        <div>
            <Navbar />
            <div className="image">
                  <img src={image} style={{ width: "90%", height: "100%" }} alt="people searching"/>
            </div>
        </div>
     );
}

export default Home;