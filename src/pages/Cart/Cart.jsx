import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context API/StoreContext'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    const {cartItems, removeCartItem, getTotalCartAmount, assets, food_list, url} = useContext(StoreContext)
    const navigate = useNavigate()

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {
                    food_list && food_list.map((item, index) => {
                           if(cartItems[item._id] > 0)
                           {
                               return (
                                   <div key={item._id+index} className="cart-items-title cart-items-item">
                                       <img src={url+"/images/"+item.image} alt='' />
                                       <p>{item.name}</p>
                                       <p>Rs {item.price}</p>
                                       <p>{cartItems[item._id]}</p>
                                       <p>Rs {item.price*cartItems[item._id]}</p>
                                       <img src={assets.remove_icon} onClick={()=>removeCartItem(item._id)} className='remove-btn'/>
                                   </div>
                               )
                           }
                        })
                }
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className='total-details'>
                        <div className="cart-total-details">
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
                    <button onClick={()=>navigate('/order')} >PROCEED TO PAYMENT</button>
                </div>
                <div className="cart-promocode">
                    <p>If you have any promocode, Enter here</p>
                    <div className="cart-promocode-input">
                        <input type='text' placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}