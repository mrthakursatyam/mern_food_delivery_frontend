import { createContext, useEffect, useState } from "react";
import {assets} from '../assets/assets'
import axios from "axios"

export const StoreContext = createContext(null)

export const MyStoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    // const url = 'http://localhost:3000'
    const url = 'https://mern-food-delivery-backend-na4e.onrender.com'
    const [token, setToken] = useState('')
    const [food_list, setFoodList] = useState()

    const addCartItem = async(itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev => ({...prev, [itemId]:1}))
        }
        else {
            setCartItems(prev => ({...prev, [itemId]:prev[itemId]+1}))
        }

        if(token){
            const response = await axios.post(url+'/api/cart/add', {itemId}, {headers:{token}})
            if(response.data.success){
                console.log(response.data.message);
            }
        }
    }

    const removeCartItem = async(itemId) => {
        setCartItems(prev => ({...prev, [itemId]:prev[itemId]-1}))
        if(token){
            const response = await axios.post(url+'/api/cart/remove', {itemId}, {headers:{token}})
            if(response.data.success){
                console.log(response.data.message);
            }
        }
    }

    const loadCartItem = async(token) => {
        const response = await axios.get(url+'/api/cart/get', {headers:{token}})
        if(response.data.success){
            setCartItems(prev => response.data.data)        
        } 
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for(const itemId in cartItems){
            if(cartItems[itemId] > 0){
                let productInfo = (food_list.length>0 && food_list.find((product) => product._id == itemId))
                totalAmount += cartItems[itemId]*productInfo.price
            }
        }
        return totalAmount
    }

    const fetchFoodData = async() => {
        const response = await axios.get(url+'/api/food/list')
        if(response.data.success){
            setFoodList(response.data.data)
        }
    }

    const contextValue = {
        cartItems,
        assets,
        url,
        token,
        food_list,
        setFoodList,
        setToken,
        addCartItem,
        removeCartItem,
        getTotalCartAmount,
    }

    useEffect(() => {
        async function load(){
            await fetchFoodData()
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                loadCartItem(token)
            }
        }
        load()
    },[])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}