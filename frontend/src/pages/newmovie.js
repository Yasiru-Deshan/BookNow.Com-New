import React, { useRef } from 'react';
import { CartContainer,TableWrapper } from './../components/InfoSection/InfoElements';
import './favorites/favorites.css';
import axios from 'axios';

function NewMovie() {

      const title = useRef();
      const desc = useRef();
      const trailer = useRef();
      const genre = useRef();
      const banner = useRef();
      const year = useRef();
      const cast1 = useRef();
      const cast2 = useRef();
      const cast3 = useRef();
      const director = useRef();

      const submitHandler = async (e)=>{
       e.preventDefault()
       let newm;

       const newMovie = {
           title: title.current.value,
           desc: desc.current.value,
           img: banner.current.value,
           trailer: trailer.current.value,
           genre: genre.current.value,
           year: year.current.value,
           cast1: cast1.current.value,
           cast2: cast2.current.value,
           cast3: cast3.current.value,
           director: director.current.value
          
       }

       try{
           newm = await axios.post("http://localhost:8070/api/movies/",newMovie)
           if(newm){
               window.alert("Movie has been added")
           }
       }catch(err){
           console.log(err)
       }
   }

   

    return( 

        <div>
        <div style={{
   /* Chrome 10-25, Safari 5.1-6 */
                          background: 'linear-gradient(to right, #240b36, #c31432)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>


              <CartContainer  >

                    <TableWrapper>

                    
               <h1 style={{     marginTop:'100px',
                                color: 'white',
                                display: 'flex',  justifyContent:'center', alignItems:'center',
                    }}><span>New Movie </span>&nbsp;
                       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg></h1>

<form onSubmit={submitHandler}>
<table>
  <tr>
    <td>


   <div className="form-group" >
    <label for="name">Movie Name</label>
    <input className="form-control" type="text" ref={title} placeholder="Enter Movie Name"/>
  </div>

    <label for="genre">Select Genre</label>
    <select className="form-control" ref={genre}>
      <option>Action</option>
      <option>Thriller</option>
      <option>Comedy</option>
      <option>Sci-fi</option>
      <option>Horror</option>
      <option>Romance</option>
    </select>

  <div className="form-group">
    <label for="description">Description</label>
    <input type="" className="form-control" id="description" placeholder="Enter Description" ref={desc}/>
  </div>
 <div className="form-group">
    <label for="banner">Banner</label>
    <input type="" className="form-control" id="banner" placeholder="Enter banner URL" ref={banner}/>
  </div>


 

 </td>

    <td style={{padding:'50px'}}>

    <label for="year">Select Year</label>
    <select className="form-control" ref={year}>
      <option>2000</option>
      <option>2001</option>
      <option>2002</option>
      <option>2003</option>
      <option>2004</option>
      <option>2005</option>
      <option>2006</option>
      <option>2007</option>
      <option>2008</option>
      <option>2009</option>
      <option>2010</option>
      <option>2011</option>
      <option>2012</option>
      <option>2013</option>
      <option>2014</option>
      <option>2015</option>
      <option>2016</option>
      <option>2017</option>
      <option>2018</option>
      <option>2019</option>
      <option>2020</option>
      <option>2021</option>
    </select>
       

         <div className="form-group">
        <label for="cast1">Cast 1</label>
        <input type="" className="form-control" id="cast1" placeholder="Cast 1" ref={cast1}/>
        </div>

         <div className="form-group">
        <label for="cast2">Cast 2</label>
        <input type="" className="form-control" id="cast2" placeholder="Cast 2" ref={cast2}/>
        </div>

         <div className="form-group">
        <label for="cast3">Cast 3</label>
        <input type="" className="form-control" id="cast3" placeholder="Cast 3" ref={cast3}/>
        </div>

    </td>
    <td>
        <div className="form-group">
        <label for="director">Director</label>
        <input type="" className="form-control" id="director" placeholder="Enter director" ref={director}/>
        </div>

        <div className="form-group">
        <label for="trailer">Trailer URL</label>
        <input type="" className="form-control" id="trailer" placeholder="Trailer URI" ref={trailer}/>
        </div>

        <button type="submit" className="btn btn-primary" style={{width:'250px', height:'130px'}} onClick={submitHandler}>Add</button>
    </td>
</tr>
</table>
</form>
                   </TableWrapper> 
                  </CartContainer> 
        </div>
</div>
    )

}

export default NewMovie;