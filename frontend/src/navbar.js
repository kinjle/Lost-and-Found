import './index.css'
import mainPicture from './assets/img/background.png'

const Navbar = () => {

    return (
        <>
            <section>
                <div className="logincontainer">
                    <div className="logincontainer-child logincontainer-child-1">
                        <img src={mainPicture} alt="" />
                    </div>
                    <div className="logincontainer-child logincontainer-child-2">
                        <div className="loginrightcontainer">
                            <div className='loginlogo'>Lost and Found</div>
                            <div className='loginDescription'>Discover the ease of finding lost belongings with Lost and Found! With a user-friendly interface, you'll navigate the process seamlessly and report lost items effortlessly. Join now and experience the simplicity of turning lost into found with just a few clicks!
                            </div>


                            <div className='loginButtonContainer'>
                                <a href="/login" className='loginATag'>
                                    <button className='loginButton'>Login</button>
                                </a>

                                <a href="/signup">
                                    <button className='signupButton'>
                                        SignUp
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}
export default Navbar;