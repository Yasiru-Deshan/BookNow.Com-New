//rfce
import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Favourite from './icon/heart1.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'



function Header() {
const state = useContext(GlobalState)
const [isLogged, setIsLogged] = state.userAPI.isLogged
const [isArtist, setIsArtist] = state.userAPI.isArtist
const [favourite] = state.userAPI.favourite


const logoutUser = async () =>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsArtist(false)
    setIsLogged(false)
}

const artistRouter = () =>{
    return(
        <>
        <li><Link to="/create_trailer">Create Advertsement</Link></li>
        <li><Link to="/category">Genre</Link></li>

        </>
    )
}
const loggedRouter = () =>{
    return(
        <>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/" onClick= {logoutUser} >Logout</Link></li>

        </>
    )

    
}
    return (
        <header>
            <div className ="menu">
                <img src={Menu} alt="" width="30"/>
        </div> 
        <div className="logo">
            <h1>
                <Link to="/">{isArtist ? 'Artist' : 'FLICKPLIX'}</Link>

            </h1>
          </div>
          <ul>
        <li><Link to ="/">{isArtist ? 'Advertisements' : 'Trailer'}</Link></li>
        
        
        {isArtist && artistRouter()}
        { 
          isLogged ? loggedRouter() :<li><Link to ="/login">Login ✥ Register</Link></li>
         }
       
       <li>
             <img src={Close} alt="" width="30" className = "menu"/>
       </li>
        </ul>
         {
             isArtist ? ''
             :<div className ="favourite-icon">
            <span>{favourite.length}</span>
            <Link to ="/favourite">
            <img src={Favourite} alt="" width="30"/>
            </Link>
        </div>
        }
      </header>
    )
}

export default Header
