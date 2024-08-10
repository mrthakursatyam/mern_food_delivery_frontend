import './Footer.css'
import { assets } from "../../assets/assets"
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <div className="footer" id='footer-section'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <Link to='/'><img src={assets.logo} className="logo" /></Link>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam ut quia libero placeat, vel quibusdam nostrum optio repellendus saepe ad nostrum sed ipsum enim.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} />
                        <img src={assets.twitter_icon} />
                        <img src={assets.linkedin_icon} />
                    </div>
                </div>
                <div className="footer-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+91-1234567890</li>
                            <li>foody@gamil.com</li>
                        </ul>
                    </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 &#169; Foody.com - ALL Right Reserved</p>
        </div>
    )
}