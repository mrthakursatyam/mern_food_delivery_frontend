import './FoodItem.css'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context API/StoreContext'

export const FoodItem = ({id, name, price, description, image}) => {
    const  {
        url,
        cartItems,
        addCartItem,
        removeCartItem,
        assets,
    } = useContext(StoreContext)

    return (
        <div key={id} className="food-item">
            <div className="food-item-img-container">
                <img className='food-item-img' src={url+"/images/"+image} alt=''/>
                {
                    !cartItems[id] ? <img onClick={()=>addCartItem(id)} src={assets.add_icon_white} className='add-one-item-btn'/> : 
                    <div className="food-item-counter">
                        <img onClick={()=>removeCartItem(id)} src={assets.remove_icon_red} className="remove-counter-btn"/>
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>addCartItem(id)} src={assets.add_icon_green} className="add-counter-btn"/>
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>Rs {price}</p>
            </div>
        </div>
    )
}