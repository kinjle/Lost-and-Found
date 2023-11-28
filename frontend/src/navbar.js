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
                            <div className='loginDescription'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam neque corrupti ea, nobis consequatur, sequi dolores, voluptatibus voluptates molestiae commodi quos ut cupiditate explicabo voluptatum dolore soluta. Voluptas deserunt asperiores nostrum perferendis veritatis illum molestias voluptatibus tempora, fuga quod quas quam ducimus doloribus sit repellat impedit porro, est excepturi commodi.
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