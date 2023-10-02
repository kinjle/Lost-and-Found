const Navbar = () => {

    return ( 
        <nav className="navbar">
            <h1>Lost and Found</h1>

            <div className="links">
                <a href="/login"><button>Login</button></a>

                <a href="/signup"><button
                style={{ color: 'white', backgroundColor: '#f1356d',}}>SignUp</button></a>
            </div>
        </nav>
     );
}

export default Navbar;