import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import './index.css'

const Home=()=>(
    <div>
        <Navbar/>
        <div className='banner'>
            <h1 className='banner-head'>NARUTO UNIVERSE</h1>
        </div>
        <div className='intro'>
            <img src='https://narutodb.xyz/_next/image?url=%2Fnaruto-head.png&w=1920&q=75' alt='mini naruto' className='mini-naruto'/>
            <h1 className='intro-head'>Explore the World of Naruto</h1>
            <div className='card-items'>
                <Link to='/characters' className='link'>
                    <div className="character-card">
                        <img src='https://narutodb.xyz/cards/teams.webp' alt='characters' className="character-image" />
                        <div className="character-info">
                            <h3 className="character-name">Characters</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/akatsuki" className='link'>
                    <div className="character-card">
                        <img src='https://narutodb.xyz/cards/akatsuki.jpg' alt='akatsuki' className="character-image" />
                        <div className="character-info">
                            <h3 className="character-name">Akatsuki</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/tailedbeasts" className='link'>
                    <div className="character-card" >
                        <img src='https://narutodb.xyz/cards/tailedbeasts.webp' alt='tailedBeasts' className="character-image" />
                        <div className="character-info">
                            <h3 className="character-name">Tailed Beasts</h3>
                        </div>
                    </div>
                </Link>
            </div> 
        </div>
    </div>
)

export default Home