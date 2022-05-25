
import React,{useEffect, useRef, useState} from 'react';
import { CartContainer,TableWrapper } from './../components/InfoSection/InfoElements';
import { TableCard } from './../components/Advertisements/Advertisements-styles';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import { ServicesCard, ServicesIcon, ServicesH2, Servicesp } from '../components/Advertisements/Advertisements-styles';
import Icon2 from '../images/svg-2.svg';
import { useParams} from "react-router";
import axios from 'axios';
import TheatreDropdownMenu from '../components/DropDowns/show1dropdown';
import TheatreDropdownMenu2 from '../components/DropDowns/show2dropdown';
import TheatreDropdownMenu3 from '../components/DropDowns/show3dropdown';
import Dropdown from 'react-bootstrap/Dropdown'

function Theatre({lightBg}) {

     const [mdal,setModal] = useState(false);
     const 
     id = useParams().id;
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [city,setCity] = useState("");
     const [mobile, setMobile] = useState("");
     const [show1,setShow1] = useState("");
     const [show2,setShow2] = useState("");
     const [show3,setShow3] = useState("");
     let [movieList, setMovieList] = useState([]);
     const [val,setVal] = useState("");
     const setShow = {val};
     

       useEffect(() => {

    const getMovies = () => {
      axios.get('http://localhost:8070/api/movies/').then((res) => {
        setMovieList(res.data);
      })
    }

    getMovies();
  }, [])

  


   const MovieList1 = ()=>{
      return movieList.map((pName)=>{

        return(
          <TheatreDropdownMenu
               key = {pName.id}
               id  = {id}
               title = {pName.title}
               />
        )
      })
    }

    
   const MovieList2 = ()=>{
      return movieList.map((pName)=>{

        return(
          <TheatreDropdownMenu2
               key = {pName.id}
               id  = {id}
               title = {pName.title}
               />
        )
      })
    }

    
   const MovieList3 = ()=>{
      return movieList.map((pName)=>{

        return(
          <TheatreDropdownMenu3
               key = {pName.id}
               id  = {id}
               title = {pName.title}
               />
        )
      })
    }


   useEffect(() => {
        async function fetchData() {
            const response = (await axios.get(`http://localhost:8070/api/theatre/find/${id}`)).data;
            setName(response.name);
            setEmail(response.email);
            setMobile(response.mobile);
            setCity(response.city);
            setShow1(response.show1);
            setShow2(response.show2);
            setShow3(response.show3);

        }
        fetchData();
    }, [id])

    return( 

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
          <Form >
              <center>
                    <ServicesIcon src={Icon2} />
              </center>     
              

             <label for="genre">Select Movie</label>
             <select className="form-control">
             
              {movieList.map(m=>(
                
                <option onClick={() => setShow(m.title)}>{m.title}</option>
              ))}
             </select>
            <Button style={{ width: '100%'}} variant="primary" type="submit" onClick={()=>setModal(false)}>Proceed</Button>
          </Form>
        </Modal>

        <div style={{
   /* Chrome 10-25, Safari 5.1-6 */
                          background: 'linear-gradient(to right, #240b36, #c31432)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>

            

              <CartContainer >
  
                    <TableWrapper >
                    <h1 style={{marginTop:'100px',
                                color: 'white',
                                display: 'flex',  justifyContent:'center', alignItems:'center',
                    }}><span>{name} </span>&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg></h1>

                 
                      <TableCard style={{margin: '50px 50px 50px 50px'}}>
                         
                       <table className='table'>
                    
                       <thead>
                       
                         <tr>
                          <th>Time</th>
                          <th>Movie</th>
                          <th></th>
                          <th></th>
                                                    
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>11.00 A.M.</td>
                          <td>{show1}</td>        
                          <td>         
                          <Dropdown>
                           <Dropdown.Toggle variant="success" id="dropdown-basic">
                             Change Movie
                           </Dropdown.Toggle>
  
                           <Dropdown.Menu>
                              <MovieList1/>
                           </Dropdown.Menu>
                          </Dropdown>
                          </td>            
                        </tr>
                          <tr>
                          <td>1.15 P.M.</td>
                          <td>{show2}</td>      
                          <td><Dropdown>
                           <Dropdown.Toggle variant="success" id="dropdown-basic">
                             Change Movie
                           </Dropdown.Toggle>
  
                           <Dropdown.Menu>
                              <MovieList2/>
                           </Dropdown.Menu>
                          </Dropdown></td>                
                        </tr>
                         <tr>
                          <td>4.15 P.M.</td>
                          <td>{show3}</td>    
                          <td><Dropdown>
                           <Dropdown.Toggle variant="success" id="dropdown-basic">
                             Change Movie
                           </Dropdown.Toggle>
  
                           <Dropdown.Menu>
                              <MovieList3/>
                           </Dropdown.Menu>
                          </Dropdown></td>                    
                        </tr>
                        
                       </tbody>
                     </table>
                     <Link to={`/admin/newmovie`}>
                      <Button variant="primary" style={{width:'225px', height:'50px'}}>
           
                    Add Movie
                 </Button></Link>
       
                    </TableCard>
                 
                   </TableWrapper> 
                  </CartContainer> 
        </div>
</div>
    )

}

export default Theatre;