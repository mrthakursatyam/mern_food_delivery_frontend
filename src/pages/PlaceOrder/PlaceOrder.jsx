import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context API/StoreContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


export const PlaceOrder = () => {
    const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zip_code:"",
        country:"",
        phone:""
    })

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setData(prev => ({...prev, [name]:value}))
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

    const orderPlace = async(e) => {
        e.preventDefault()

        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        let orderItems = []
        food_list.map((item) => {
            if(cartItems[item._id] > 0){
              let itemInfo = item
              itemInfo["quantity"] = cartItems[item._id]
              orderItems.push(itemInfo)
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount()+40
        }

        try {
            const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
            if (response.data.success) {
              const { orderId, frontend_url } = response.data;
      
              // Open Razorpay checkout
              const options = {
                key: import.meta.env.VITE_RAZORPAY_API_KEY, // Your Razorpay Key Id
                amount: orderData.amount * 100,
                currency: 'INR',
                name: 'Foody',
                description: 'Order Payment',
                order_id: orderId,
                handler: async function (response) {
                  window.location.href = `${frontend_url}/${true}`
                },
                prefill: {
                  name: data.firstName + ' ' + data.lastName,
                  email: data.email,
                  contact: data.phone,
                },
                modal: {
                  ondismiss: function () {
                    // Handle cancellation
                    alert('Payment was cancelled.');
                    window.location.href = `${frontend_url}/${false}` // Redirect to your cancel URL
                  },
                },
                theme: {
                  color: '#F37254',
                },
                method: {
                  upi: true, // Enable UPI
                },
              };
      
              const rzp1 = new window.Razorpay(options);
              rzp1.open();
            } else {
              console.error('Error in creating session', response.data.message);
            }
          } catch (error) {
            console.error('Error during checkout', error);
          }
    }

    const navigate = useNavigate()
    useEffect(() => {
      if(!token || getTotalCartAmount() === 0){
        navigate('/cart')
      }
    }, [token])

    return (
        <form onSubmit={orderPlace} className="place-order">
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name'/>
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name'/>
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address'/>
                <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street'/>
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'/>
                    <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'/>
                </div>
                <div className="multi-fields">
                    <input required name='zip_code' onChange={onChangeHandler} value={data.zip_code} type='text' placeholder='Zip code'/>
                    <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'/>
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'/>
            </div>
            <div className="place-order-right">
                <div className="place-order-total">
                    <h2>Cart Totals</h2>
                    <div className='total-details'>
                        <div className="place-order-details">
                            <p>SubTotal</p>
                            <p>Rs {getTotalCartAmount()}</p>
                        </div>
                        <div className="place-order-details">
                            <p>Delivery Fee</p>
                            <p>Rs {getTotalCartAmount()>0 ? 40:0}</p>
                        </div>
                        <div className="place-order-details">
                            <b>Total</b>
                            <b>Rs {getTotalCartAmount()+(getTotalCartAmount()>0 ? 40:0)}</b>
                        </div>
                    </div>
                    <button >PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </form>
    )
}