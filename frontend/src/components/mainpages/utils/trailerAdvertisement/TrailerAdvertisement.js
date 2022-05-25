import React from 'react'
import BtnRender from './BtnRender'


//get product information to the user interface

function TrailerAdvertisement({trailer, isArtist, deleteTrailer,handleCheck}) {
    
    return (
        <div className="trailer_card">
            {
                isArtist && <input type="checkbox" checked ={trailer.checked}
                onChange={() => handleCheck(trailer._id)}/>
            }
            <img src={trailer.images.url} alt=""/>

        <div className ="trailer_box">
            <h2 title={trailer.title}>{trailer.title}</h2>
           {/*<span>${product.price}</span>*/}
           <span>{trailer.price}Viewers</span>
            <p>{trailer.description}</p> 
                   
        </div>
       
        <BtnRender trailer={trailer} deleteTrailer={deleteTrailer} />
        </div>
       
         )
}

export default TrailerAdvertisement








