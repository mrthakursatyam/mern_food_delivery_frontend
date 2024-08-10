import './Navbar.css'
import { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context API/StoreContext'

export const Navbar = ({setShowLogin}) => {
    const [activeMenu, setActiveMenu] = useState('home') 
    const {getTotalCartAmount, assets, token, setToken} = useContext(StoreContext)
    const navigate = useNavigate()

    const onLogout = () => {
        setToken('')
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="navbar">
            <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
            <ul className="navbar-menu">
                <li onClick={()=>setActiveMenu('home')}><Link to='/' className={`${activeMenu == 'home' ? 'active':""}`}>Home</Link></li>
                <li onClick={()=>setActiveMenu('menu')}><a href='#explore-menu-section' className={`${activeMenu == 'menu' ? 'active':""}`}>Menu</a></li>
                <li onClick={()=>setActiveMenu('mobile-app')}><a href='#appDownload-section' className={`${activeMenu == 'mobile-app' ? 'active':""}`}>Mobile-App</a></li>
                <li onClick={()=>setActiveMenu('contact-us')}><a href='#footer-section' className={`${activeMenu == 'contact-us' ? 'active':""}`}>Contact Us</a></li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="basket-container">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={`${getTotalCartAmount() === 0 ? "":"dot"}`}></div>
                </div>
                {
                    !token ? 
                    <button onClick={()=>setShowLogin(true)} className='signIn-btn'>Sign in</button>
                    :
                    <div className="nav-profile">
                        <img src={assets.profile_icon} className='profile-icon'/>
                        <ul className='nav-profile-dropdown'>
                            <li onClick={()=>navigate('/myorder')}><img src={assets.bag_icon} alt=''/><p>Orders</p></li>
                            <li onClick={onLogout}><img src={assets.logout_icon} alt=''/><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>

        </div>
    )
}