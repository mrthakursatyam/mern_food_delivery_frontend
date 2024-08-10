import './ExploreMenu.css'
import {menu_list} from '../../assets/assets';

export const ExploreMenu = ({category, setCategory}) => {
    return (
        <div className="explore-menu" id='explore-menu-section'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>Savor a wide variety of dishes from our carefully curated menu, each crafted to delight your taste buds. Enjoy a culinary journey with flavors from around the world.</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => (
                        <div key={index} onClick={()=>setCategory(prev => prev===item.menu_name ? 'All':item.menu_name)}  className="explore-menu-list-item">
                            <img src={item.menu_image} className={`item-img ${category===item.menu_name ? 'active':''}`}/>
                            <p className={`${category===item.menu_name ? 'pActive':''}`}>{item.menu_name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}