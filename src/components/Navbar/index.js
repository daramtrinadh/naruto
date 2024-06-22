import {Link} from 'react-router-dom'
import './index.css'
const Navbar=()=>(
    <nav className="navbar">
        <Link to="/" className='link'><h1 className='brand-name'>Naruto</h1></Link>
    </nav>

)
export default Navbar