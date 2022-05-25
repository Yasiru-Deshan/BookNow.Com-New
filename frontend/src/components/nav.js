import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';
//import { Navbar } from 'react-bootstrap';

const Navbar = props =>{

    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const onClickLogoutHandler =() =>{
        AuthService.logout().then(data =>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }


    const unauthenticatedNavBar = () =>{
        return(
            <>
                <Link to='/'>
                    <li className='nav-item nav-link'>
                        Home
                    </li>
                </Link>
                <Link to='/login'>
                    <li className='nav-item nav-link'>
                        Login
                    </li>
                </Link>
                <Link to='/register'>
                    <li className='nav-item nav-link'>
                        Register
                    </li>
                </Link>
                <Link to='/browse'>
                    <li className='nav-item nav-link'>
                        Movies
                    </li>
                </Link>
                <Link to='/cart'>
                    <li className='nav-item nav-link'>
                        Cart
                    </li>
                </Link>
                <Link to='/admin/theatres'>
                    <li className='nav-item nav-link'>
                        Theatres
                    </li>
                </Link>
                <Link to='/admin/movies'>
                    <li className='nav-item nav-link'>
                        Movie List
                    </li>
                </Link>
                
            </>
        )
    }

   const authenticatedNavbar = ()=>{
       return(
           <>
                <Link to='/'>
                    <li className='nav-item nav-link'>
                        Home
                    </li>
                </Link>
                <Link to='/browse'>
                    <li className='nav-item nav-link'>
                        Browse
                    </li>
                </Link>
               
                {
                    user.role === "admin" ?
                     <Link to='/cart'>
                    <li className='nav-item nav-link'>
                        Cart
                    </li>
                </Link> : null
                }
                <button type="button" className='="btn btn-link nav-item nav-link'
                        onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
       
   }   
return(
        <nav className="navbar navbar-expand-lg bg-light">
            <Link to='/'>
                <div className="navbar-brand"></div>
            </Link>
 

           <div className="collapse navbar-collapse" id="navbarNav">
                 <ul className="navbar-nav">
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavbar()}  
                 </ul>
           </div>

        </nav>
)
}

export default Navbar;