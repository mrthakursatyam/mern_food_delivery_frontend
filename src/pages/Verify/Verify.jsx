import { useContext, useEffect } from 'react'
import {StoreContext} from '../../context API/StoreContext'
import {Navigate, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import axios from 'axios'

export const Verify = () => {
    const navigate = useNavigate()
    const {url} = useContext(StoreContext)
    // const [searchParams, setSearchParams] = useSearchParams()
    // const orderId = searchParams.get('orderId');
    // const success = searchParams.get('success');
    const {orderId, success} = useParams()

    const verifyPayment = async() => {
        const response = await axios.post(url+"/api/order/verify", {success, orderId})

        if(response.data.success){
            navigate('/placed', { state: {orderId } })
        }else{
            console.log(response.data.message);
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
    },[])

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    )
}
