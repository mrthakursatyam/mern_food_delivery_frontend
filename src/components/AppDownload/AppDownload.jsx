import './AppDownload.css'
import '../../assets/assets'
import { assets } from '../../assets/assets'

export const AppDownload = () => {
    return (
        <div className="appDownload" id='appDownload-section'>
            <p>For Better Experience Download <br/> Foody App</p>
            <div className="appDownload-platforms">
                <img src={assets.play_store} alt=''/>
                <img src={assets.app_store} alt=''/>
            </div>
        </div>
    )
}