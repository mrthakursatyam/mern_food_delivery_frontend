import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context API/StoreContext'
import { toast } from 'react-toastify';
import axios from 'axios'


export const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState('Login')
    const {url, setToken} = useContext(StoreContext)
    const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    })

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setData(prev => ({...prev, [name]: value}))
    }

    const onLogin = async(e) => {
        e.preventDefault()  
        let newUrl = url
        if(currState == 'Login'){
            newUrl += '/api/user/login'
        }
        else{
            newUrl += '/api/user/register'
        }
        const response = await axios.post(newUrl, data)

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-header">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} alt="" onClick={()=>setShowLogin(false)}/>
                </div>
                <div className="login-popup-inputs">
                    {currState == 'Login' ? <></> : <input onChange={onChangeHandler} type='text' name='name'  placeholder='your name' required/>}
                    <input onChange={onChangeHandler} type='email' name='email' placeholder='your email' required/>
                    <input onChange={onChangeHandler} type='password' name='password' placeholder='your password' required autoComplete='true'/>
                </div>
                <button onClick={onLogin}>{currState == 'Login' ? 'Login':'Create account'}</button>
                {currState == 'Sign Up' ? <div className="login-popup-condition">
                    <input type='checkbox' required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div> : <></>}
                {
                    currState == 'Login' ?
                    <p className='last-text'>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
                    :
                    <p className='last-text'>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}