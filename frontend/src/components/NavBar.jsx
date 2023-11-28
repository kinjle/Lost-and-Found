import react from 'react';
import "../mainfeed.css";


const NavBar = () => {
    return (
        <>
            <nav className="navcontainer">
                <div className="logocontainer">Lost and Found</div>
                <div className="navbuttoncontainer">
                    <a href="/lostitemform" className="">
                        <button className="postitembutton">Post Item</button>
                    </a>
                    <a href="/feed">
                        <button className="mypostbutton">My Posts</button>
                    </a>
                    <a href="/claimeditems">
                        <button className="claimeditembutton">Claim Item</button>
                    </a>
                    <a href="/">
                        <button className="signoutbutton">Sign Out</button>
                    </a>
                </div>
            </nav>
        </>
    )

}

export default NavBar;