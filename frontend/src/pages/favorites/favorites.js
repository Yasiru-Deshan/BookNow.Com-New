import React,{ useEffect, useState, useRef} from 'react';
import {  MDBCol } from "mdbreact"
import FavoritesItem from '../../components/Favorites/favoriteItem';
import Carousel from "react-elastic-carousel";
import './favorites.css';
import Playlist from '../../components/Playlist/playlist';
import axios from 'axios';
import Modal from 'react-modal';
import { Button,Form } from 'react-bootstrap';



const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 5 },
  ];



function Favorites() {
    
  
  
    const name = useRef();
    const desc = useRef();
    let [plist, setPlaylist] = useState([]);
    let [favs, setFavs] = useState([]);
    const [mdal,setModal] = useState(false);
    let [search, setSearch] = useState("");


















    const submitHandler  = async(e)=>{
      e.preventDefault()
      let newPlay;

   

      const newPlaylist = {
        userId: '611b74dd16f8353848675308',
        name: name.current.value,
        desc: desc.current.value,
      }

      
      try{
        newPlay = await axios.post("http://localhost:8070/api/playlists/new", newPlaylist)

        if(newPlay){
            window.alert("New Play list has been added")
        }
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{

      const getFavs = () =>{
        axios.get('http://localhost:8070/api/favorites/allfavs').then((res)=>{
          setFavs(res.data);
        })
      }

      getFavs();
    },[])

    const FavoritesAll = ()=>{
      return favs.map((mName)=>{

        return(
          <FavoritesItem
               key = {mName.id}
               id  =   {mName.movieId}
               title = {mName.title}
                img = {mName.img}
                year={mName.year}
                type={mName.genre}  
                />
        )
      })
    }


    useEffect(()=>{

      const getPlayLists = () =>{
        axios.get('http://localhost:8070/api/playlists').then((res)=>{
          setPlaylist(res.data);
        })
      }

      getPlayLists();
    },[])

    const PlaylistAll = ()=>{
      return plist.map((pName)=>{

        return(
          <Playlist
               key = {pName.id}
               id  =   {pName._id}
               name = {pName.name}
               desc = {pName.desc} />
        )
      })
    }

    //search filter
    if(search.length > 0){
      plist = plist.filter((i) => {
          return i.name.toLowerCase().match(search.toLowerCase());
      });
    }

   
    return (

        <div>

        <Modal
         isOpen={mdal} 
         onRequestClose={()=> setModal(false)}
         style={{
           overlay: {
             backgroundColor: 'transparent',
             marginTop: '100px',
             width: '40%',
             height: '445px',
             marginLeft: '50%', 
           
           },

           content: {
             borderRadius: '20px',
             color: 'white',
             background: 'black',
             


             
           }
         }}>
          <h1>Create a New Playlist</h1>
          <Form onSubmit={submitHandler}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
                          placeholder="Enter playlist name"
                          ref ={name} 
                          />

            <Form.Label>Description</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter playlist description"
                          ref={desc}  
                          />
           <Button variant="primary" onClick={()=>setModal(false)}>
           
             Close
            </Button>
            <Button variant="primary" type="submit">
          
             Create
            </Button>
           
          </Form>
        </Modal>


        <div style={{ 
                   
                      background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>
        <React.Fragment>

         .<center>
              
           <MDBCol md="6" className="searchbar">
               <input className="form-control" 
                      type="text"
                      placeholder="Search playlists"
                      aria-label="Search"
                      onChange={(e) => {setSearch(e.target.value)}} value={search}
                       />
           </MDBCol>

           
          </center> 

        <div className="MenuContainer" >

         
            <div className="headingWrapper">
            <div>
        <h1 className="fHeading">Favorites</h1>
        </div>

        
        
        <button className="newPlaylist" onClick =
        {()=> setModal(true)}>
        Create New playlist</button>
        
        
        </div>

  
    

      <div className="carousel">
        <Carousel breakPoints={breakPoints}>
          
         <FavoritesAll/>
        </Carousel>
              
      </div>

      
      </div>

     <PlaylistAll/>
             
            </React.Fragment>
        </div>

   </div>

    )
}

export default Favorites
