import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Trailers from './trailers/Trailers'
import DetailTrailer from './detailTrailer/DetailTrailer'
import Login from './auth/Login'
import Register from './auth/Register'
import Favourite from './favourite/Favourite'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateTrailer from './createTrailer/CreateTrailer'
import {GlobalState} from '../../GlobalState'


function Pages() {
   const state = useContext(GlobalState)
   const [isLogged] =state.userAPI.isLogged
   const [isArtist]= state.userAPI.isArtist
   return (
      
      <Switch>
          <Route path="/trailer" exact component={Trailers} />
          <Route path="/detail/:id" exact component={DetailTrailer} />
       
       <Route path="/login/admin" exact component= {isLogged ? NotFound :Login }/>
          <Route path="/register" exact component= {isLogged ? NotFound : Register} />
         
          <Route path="/category" exact component= {Categories} />
         <Route path="/create_trailer" exact component= {CreateTrailer} />
          <Route path="/edit_trailer/:id" exact component= {isArtist ? CreateTrailer : NotFound} />
         
          <Route path="/history" exact component= {isLogged ? OrderHistory : NotFound} />
          <Route path="/history/:id" exact component= {isLogged ? OrderDetails : NotFound} />
         
          <Route path="/favourite" exact component={Favourite} />
           <Route path="*" exact component={NotFound} />
          

      </Switch>
   )
}

export default Pages
