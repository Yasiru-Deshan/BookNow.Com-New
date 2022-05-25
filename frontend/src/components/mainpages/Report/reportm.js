import React,{ useEffect, useState} from 'react';
import {  MDBCol } from "mdbreact";
import FavoritesTable from './item';
import './../../../pages/Browse/Browse.css';
import axios from 'axios'
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import Table from 'react-bootstrap/Table'



const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 5 },
  ];

function Browsemimi() {

  let [movieList, setMovieList] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {

    const getMovies = () => {
      axios.get('http://localhost:8070/api/movies/').then((res) => {
        setMovieList(res.data);
      })
    }

    getMovies();
  }, [])

  const AllThrillerMovies = () => {
    return movieList.map((pName) => {

      return (
        <FavoritesTable
          key={pName.id}
          id={pName._id}
          img = {pName.img}
          title={pName.title}
          desc={pName.desc} 
          year={pName.year}
          genre={pName.genre}
          />
      )
    })
  }



 

  //search filter
    if(search.length > 0){
      movieList = movieList.filter((i) => {
          return i.title.toLowerCase().match(search.toLowerCase());
      });
     
    }

    
       //Generate Favorites Movie Report
        const pdf2 = () => {
          const loading = document.getElementById('loading');
          loading.style.display = "";//display loading icon
          const dwnIcon = document.getElementById('dwn-icon');
          dwnIcon.style.display = "none";//hide download icn
  
          setTimeout(() => {  
              loading.style.display = "none";
              dwnIcon.style.display = "";
          }, 1300);//display loading icon for 2 seconds  
  
          let bodyData = [];
          for(let j = 0;movieList.length > j ; j++){
              bodyData.push([ movieList[j].title,movieList[j].year,movieList[j].genre]);
          }//save json data to bodydata in order to print in the pdf table
  
          const doc = new jsPDF({orientation:"portrait"});
          var time = new Date().toLocaleString();
          doc.setFontSize(20);
          doc.text(`Movies Collection`, 105, 13, null, null, "center");
          doc.setFontSize(10);
          doc.text(`(Generated on ${time})`, 105, 17, null, null, "center");
          doc.setFontSize(12);
          doc.text("FlickPlix © 2021 All rights reserved.", 105, 22, null, null, "center");
          
          doc.autoTable({
              theme : 'grid',
              styles: {halign:'center'},
              headStyles:{fillColor:[71, 201, 76]},
              startY:27,
              head: [['Movie Title','Year','Genre']],
              body: bodyData
          })
          doc.save('Movies.pdf');
      }

    return (
        <div>
            
        <div style={{
    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>
        <React.Fragment>

         .<center>
              
           <MDBCol md="6" className="searchbar">
               <input className="form-control" 
                      type="text"
                      placeholder="Search Movies"
                      aria-label="Search"
                      onChange={(e) => {setSearch(e.target.value)}} value={search}
                       />
           </MDBCol>

      <Table striped bordered hover="dark" style={{width:"500px", color:"white"}}>

<th>
          
            <td style={{width:"300px"}}>Title</td>
            <td style={{width:"100px"}}>Year</td>
            <td style={{width:"100px"}}>Genre</td>
          </th>
           
            <tbody>
               <AllThrillerMovies/>
            </tbody>
       

      </Table>
         
          </center> 
                       <button onClick={pdf2} className="newPlaylist"><svg id="dwn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
          <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
          </svg><span className="spinner-border spinner-border-sm" id="loading" role="status" aria-hidden="true" style={{display:'none'}}></span> Download </button>

    
</React.Fragment>

     </div>
        
</div>
        
    )
}

export default Browsemimi
