import React,{useState, useEffect} from 'react';
import { CartContainer,TableWrapper } from './../components/InfoSection/InfoElements';
import { TableCard } from './../components/Advertisements/Advertisements-styles';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {  MDBCol } from "mdbreact";
import './favorites/favorites.css';
import axios from "axios";
import { ServicesCard, ServicesIcon, ServicesH2, Servicesp } from '../components/Advertisements/Advertisements-styles';
import Modal from 'react-modal';

function MovieList() {

      let [search, setSearch] = useState("");
      let [movieList, setMovieList] = useState([]);
      const [mdal,setModal] = useState(false);
      //const id = useParams().id;
      const [title, setTitle] = useState("");
      const [genre,setGenre] = useState("");
      const [description, setDesc] = useState("");
      const [trailer, setTrailer] = useState("");
      const [image,setImage] = useState("");
      const [id,setId] = useState("");

       useEffect(() => {

    const getMovies = () => {
      axios.get('http://localhost:8070/api/movies/').then((res) => {
        setMovieList(res.data);
      })
    }

    getMovies();
  }, [])

  const submitHandler  = async(e)=>{
      let update;

      e.preventDefault()
      const updatedMovie = {
        title: title,
        genre: genre,
        desc: description,
        trailer: trailer,
        img: image
        
      }

      try{
        update = await axios.put(`http://localhost:8070/api/movies/${id}`,updatedMovie)

         if (update){
       window.alert(`Movie has been updated`)
  }
      }catch(err){
        console.log(err)
      }
    }

   useEffect(() => {
        async function fetchData() {
            const response = (await axios.get(`http://localhost:8070/api/movies/find/${id}`)).data;
            setTitle(response.title);
            setGenre(response.genre);
            setDesc(response.desc);
            setTrailer(response.trailer)
            setImage(response.img);
        
        }
        fetchData();
    }, [id])

    const deleteMovie = async (id) => {
    let deletion;

    if (window.confirm("Are you sure about deleting this Movie?")) {
      deletion = await axios.delete(`http://localhost:8070/api/movies/${id}`);
    }
    //const deletion = await axios.delete(`http://localhost:8070/customers/delete/${id}`);
  if (deletion){
       window.alert("Movie has been deleted")
  }else{
      window.alert("Sorry! You can only delete your movies")
  }
  }

    return( 

        <div>

         <div>
         <Modal
         isOpen={mdal} 
         onRequestClose={()=> setModal(false)}
         style={{
           overlay: {
             backgroundColor: 'transparent',
             marginTop: '100px',
             width: '40%',
             height: '485px',
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
          <ServicesH2>Edit Movie</ServicesH2>
         </center> 
          <Form onSubmit={submitHandler}>

             <label for="name">Movie Name</label>
             <input className="form-control" type="text" value={title} onChange={(e) => {setTitle(e.target.value);}} />

             <label for="genre">Genre</label>
              <select className="form-control" onChange={(e) => {setGenre(e.target.value);}} >
               <option>Action</option>
               <option>Thriller</option>
               <option>Comedy</option>
               <option>Sci-fi</option>
               <option>Horror</option>
               <option>Romance</option>
              </select>
               <label for="name">Description</label>
             <input className="form-control" type="text" value={description} onChange={(e) => {setDesc(e.target.value);}} />
              <label for="name">Banner</label>
             <input className="form-control" type="text" value={image} onChange={(e) => {setImage(e.target.value);}} />
              <label for="name">Trailer URL</label>
             <input className="form-control" type="text" value={trailer} onChange={(e) => {setTrailer(e.target.value);}} />
             <Button style={{ width: '40%'}} variant="primary"onClick={()=>setModal(false)}>Cancel</Button>
             <Button style={{ width: '40%'}} variant="primary" type="submit" onClick={()=>setModal(false)}>Proceed</Button>
          </Form>
        </Modal>
        </div>
        <div style={{
   /* Chrome 10-25, Safari 5.1-6 */
                          background: 'linear-gradient(to right, #240b36, #c31432)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>


              <CartContainer >

                    <TableWrapper >

                    
               <h1 style={{     marginTop:'100px',
                                color: 'white',
                                display: 'flex',  justifyContent:'center', alignItems:'center',
                    }}><span>Movie List </span>&nbsp;
                       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg></h1>

            <center>
              <MDBCol md="4" className="searchbar">
               <input className="form-control" 
                      type="text"
                      placeholder="Search Movies"
                      aria-label="Search"
                      onChange={(e) => {setSearch(e.target.value)}} value={search}
                       />
              </MDBCol>
            </center>
           
           <Link to={`/admin/newmovie`}>
              <Button  style={{  marginLeft: 'calc(72vw + 26px)',
                                 width:'150px',
                                 color: '#fff',
                                 marginTop:'-120px',
                                 marginBottom: '30px'}}>
               Add New Movie</Button></Link>


                   <center>
                      <TableCard style={{margin: '0px 50px 50px 50px', width: '600px'}}>
                       <table className='table'>
                    
                       <thead>
                       
                         <tr>
                         
                          <th>Movie</th>
                          <th></th>
                          <th></th>
                                                    
                        </tr>
                        </thead>
                        <tbody>
                        {movieList.map(m => (
                        <tr>
                          <td>{m.title}</td>
                           <td><Button onClick={()=>{setId(m._id);setModal(true);}}>Update</Button></td>
                          <td><Button variant="danger" onClick={()=>deleteMovie(m._id)}>Delete</Button></td>                            
                        </tr>
                         
                        ))}
                       </tbody>
                     </table>
                    </TableCard>
                    </center>
                   </TableWrapper> 
                  </CartContainer> 
        </div>
</div>
    )

}

export default MovieList;