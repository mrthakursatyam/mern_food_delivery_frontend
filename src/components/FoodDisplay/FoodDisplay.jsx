import './FoodDisplay.css'
import { FoodItem } from '../FoodItem/FoodItem'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context API/StoreContext'


export const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)

    return (
        <div className="food-display">
            <h1>Top dishes near you</h1>
            <div className="item-lists-container">
               {food_list && food_list.filter((item) => {
                    if(category === 'All')
                       return item
                    return item.category == category
               })
               .map((item, id) => 
                 <FoodItem key={id} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
               )}
            </div>
        </div>
    )
}