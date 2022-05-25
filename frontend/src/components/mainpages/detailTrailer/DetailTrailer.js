import React,{useContext,useState,useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import TrailerAdvertisement from '../utils/trailerAdvertisement/TrailerAdvertisement'

function DetailTrailer() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [trailers] = state.trailersAPI.trailers
    const[detailTrailer, setDetailTrailer] = useState([])

    useEffect(() =>{
        //console.log('re render')
        if(params.id){
            trailers.forEach(trailer => {
                if(trailer._id === params.id) setDetailTrailer(trailer)

                 });
        }
    }, [params.id, trailers])
  //  console.log(detailProduct)
  if(detailTrailer.length === 0) return null;

    return (
        <>
        <div className="detail">
            <img src={detailTrailer.images.url} alt=""/>
            <div className="box-detail">
                <div className="row">
                    <h2>{detailTrailer.title}</h2>
                    <h6>#id: {detailTrailer.trailer_id}</h6>
                    </div>
                    <span>$ {detailTrailer.price}</span>
                    <p>{detailTrailer.description}</p>
                    <p>{detailTrailer.content}</p>
                    <p>Sold:{detailTrailer.sold}</p>
                    <Link to="/favourite" className="favourite">Add to favourites</Link>
                     </div>
                 </div>
                 <div>
                     <h2>Related Advertisements</h2>
                     <div className ="trailers">
                         {
                             trailers.map(trailer =>{
                                 return trailer.category === detailTrailer.category
                             ? <TrailerAdvertisement key={trailer._id} trailer ={trailer} /> : null
                             })
                         }
                     </div>
                 </div>
                 </>
               )
}

export default DetailTrailer
