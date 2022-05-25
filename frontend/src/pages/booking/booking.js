/* eslint-disable */
import React, { useEffect, useRef, useState} from 'react';
import './../movie/movie.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Aos from 'aos';
import "aos/dist/aos.css";
//import Comments from '../../../components/CommentSection/comments';
import {Link} from 'react-router-dom';
import axios from 'axios'; 
import { useParams} from "react-router";
//import DropdownMenu from '../../../pages/user/favorites/dropdown';
import { Button, Form } from 'react-bootstrap';
import { TableCard } from '../../components/Advertisements/Advertisements-styles';
import { ServicesIcon, ServicesH2 } from '../../components/Advertisements/Advertisements-styles';
import { InfoContainer,
         TableWrapper,    
} from './../../components/InfoSection/InfoElements';
import Modal from 'react-modal';
import Icon2 from '../../images/svg-2.svg';




const Booking = ({lightBg,lightText}) =>{
  
   //const name = useRef(); 
   const desc = useRef();
   const id = useParams().id;
   const [title, setTitle] = useState("");
   const [year, setYear] = useState("");
   const [genre,setGenre] = useState("");
   const [description, setDesc] = useState("");
   const [trailer, setTrailer] = useState("");
   const [video, setVideo] = useState("");
   const [image,setImage] = useState("");
   let [plist, setPlaylist] = useState([]);
   const [like,setlike] = useState();
   const [isliked,setisLiked] = useState(false);
   const [mdal,setModal] = useState(false);
   const [moviename,setMoviename] = useState("");
   const [theatrename,setTheatrename] = useState("");
   const [tickets,setTickets] = useState("");
   const [time,setTime] = useState("");
   const [date,setDate] = useState("");
   const [theatre,setTheatre]= useState([]);

       useEffect(()=>{
        Aos.init({duration: 2000 });
    },[])
   
    useEffect(() => {
        async function fetchData() {
            const response = (await axios.get(`http://localhost:8070/api/movies/find/${id}`)).data;
            setTitle(response.title);
            setYear(response.year);
            setGenre(response.genre);
            setDesc(response.desc);
            setTrailer(response.trailer);
            setVideo(response.video);
            setImage(response.img);
            setlike(response.likes.length)
        
        }
        fetchData();
    }, [id])

    useEffect(() => {

    const getTheatres = () => {
      axios.get('http://localhost:8070/api/theatre/all').then((res) => {
        setTheatre(res.data);
        
      })
    }

    getTheatres();
  }, [])

 
 
    const likehandler=()=>{

        try{
            axios.put(`http://localhost:8070/api/movies/${id}/like`)
        }catch(err){}

        setlike(isliked ? like-1 : like+1);
        setisLiked(!isliked);
    }
  


    
   const submitBookingHandler = async (e)=>{
       e.preventDefault()
       let newCart;

       const newBooking = {
           
           movieId: id,
           movieName: title,
           theatreName: "Majestic",
           img: image,
           year: year,
           genre: genre,
           tickets: tickets,
           time: "4.15",
           date: "Mar 15"
           //movieId:'6145eb2e19467e39980d27e7',
        
       }

       try{
           newCart = await axios.post("http://localhost:8070/api/cart/addto",newBooking)
           if(newCart){
               window.alert("Movie has been added to cart ")
           }
       }catch(err){
           console.log(err)
       }
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
             height: '505px',
             marginLeft: '30%', 
           
           },

           content: {
             borderRadius: '20px',
             color: 'black',
             background: 'white',  
             boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
           }
         }}>
         <center>
          <ServicesH2>How many Tickets?</ServicesH2>
         </center> 
          <Form onSubmit={submitBookingHandler}>
              <center>
                    <ServicesIcon src={Icon2} />
              </center>     

              <button type="button" className="btn btn-outline-primary" onClick={() => setTickets(1)}>1</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => setTickets(2)}>2</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => setTickets(3)}>3</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => setTickets(4)}>4</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => setTickets(5)}>5</button>
              

             <Button variant="primary" style={{width:'225px', height:'50px'}} onClick={()=>setModal(false)}>
           
             Close
            </Button>
            <Button variant="primary" style={{width:'225px', height:'50px'}} type="submit">
          
             Confirm
            </Button>
           
          </Form>
        </Modal>

            <div className="MovieContainer">
                <div className="MovieWrapper">
                     <div className="MovieRow">
                     <div className="Column1">
                             <div className="ImgWrap">

                              <img data-aos="fade-right" className="Img" src={image} alt=''/>
                            
                            
                             </div>
                          
                          
                          </div>
                          <div className="Column2">
                             <div className="TextWrapper">

                                 <h1 className="Heading">
                                  {title}

                                 </h1>

                                 <p className="Year">{year}</p>
                                 <p className="Genre">
                                    {genre}
                                 </p>

                               

                                 <div className="icons">
                                    <FavoriteIcon className="fi" onClick={likehandler}/>
                                    <p className="likesCount">{like}</p>
                                  
                                 </div>
                                    
  

                                 <Link to={`/watch/${id}`}>
                                 <Button>View Trailer</Button></Link>
                                 <div>
                              
                          {/*     <img className="profileuserimg"
                                  src={img2}
    alt=''/>*/}
                         </div>
                               
                             </div>
                            
                          
                          
                          </div>

                          <div className="Column3">
                          <p className="Syno">
                                     Synopsis
                                 </p>
                          <p className="Description">
                            
                                  {description}
                          </p>
                        

                          </div>

                         
                      </div>
                   </div>
                </div>


                <InfoContainer lightBg = {lightBg} >
                    <TableWrapper >
                      <TableCard style={{margin: '50px 50px 50px 0px'}}>
                       <table className='table'>
                    
                       <tbody>
                        {theatre.map(c => (
                         <tr>
                          <td>{c.name}</td>
                          <td><button type="button" className="btn btn-outline-primary" onClick ={()=> setModal(true)}>7.30 A.M.</button></td>
                          <td><button type="button" className="btn btn-outline-primary" onClick ={()=> setModal(true)}>10.30 A.M.</button></td>
                          <td><button type="button" className="btn btn-outline-primary" onClick ={()=> setModal(true)}>1.15 P.M.</button></td>
                          <td><button type="button" className="btn btn-outline-primary" onClick ={()=> setModal(true)}>4.15 P.M.</button></td>                          
                        </tr>
                        ))}
                        
                       </tbody>
                     </table>
                    </TableCard>
                   </TableWrapper> 
                  </InfoContainer> 

        </div>
    )
}

export default Booking
