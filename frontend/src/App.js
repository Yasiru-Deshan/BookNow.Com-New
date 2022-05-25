import './App.css'; 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/nav';
import Sidebar from './components/Sidebar';
//import Navbar from './components/Navbar';
import Home from './pages/home/index';
import Movie from './pages/movie/movie';
import Watch from './pages/movie/watch';
import Browse from './pages/Browse/Browse';
import Footer from './components/Footer';
import './components/Footer/FooterElements'
import Favorites from './pages/favorites/favorites';
import Booking from './pages/booking/booking';
import Cart from './pages/cart/cart'
import Payment from './pages/payment/payment';
import TheatreList from './pages/theatrelist';
import Theatre from './pages/theatre';
import MovieList from './pages/movielist';
import NewMovie from './pages/newmovie';
import NewTheatre from './pages/newtheatre';
import Login from './components/Login';
import Register from './components/Register';


const App = ()=> {

  // const { user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  // console.log(user);
  // console.log(isAuthenticated);

  const [isOpen, setIsOpen] = useState(false)

    const toggle = ()=>{
        setIsOpen(!isOpen)
    }
  return (


    <Router>
      {/* <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>     */}
        <Navbar/>
      <Routes>
     
        <Route path='/' element={<Home/>} exact/>
        <Route path='/login' element={<Login/>} exact/>
        <Route path='/register' element={<Register/>} exact/>
        <Route path='/movie/:id' element={<Movie/>} exact/>
        <Route path='/watch/:id' element={<Watch/>} exact/>
        <Route exact path='/favorites' element={<Favorites/>}/>
        <Route path='/browse' element={<Browse/>} exact/>
        <Route path='/booking/:id' element={<Booking/>} exact/>
        <Route path='/cart' element={<Cart/>} exact/>
        <Route path='/payment' element={<Payment/>} exact/>
        <Route path='/admin/theatres' element={<TheatreList/>} exact/>
        <Route path='/admin/theatres/:id' element ={<Theatre/>} exact/>
        <Route path='/admin/movies' element={<MovieList/>} exact/>
        <Route path='/admin/newmovie' element={<NewMovie/>} exact/>
        <Route path='/admin/newtheatre' element={<NewTheatre/>} exact/>
   
  </Routes>
      <Footer/>
	</Router>

 
  );
}

export default App;