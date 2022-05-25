import React, {useContext,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import TrailerAdvertisement from '../utils/trailerAdvertisement/TrailerAdvertisement'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Trailers() {

    const state = useContext(GlobalState)
    const [trailers, setTrailers] = state.trailersAPI.trailers
   const [isArtist] =state.userAPI.isArtist
    const [token] =state.token
    const [callback, setCallback] =state.trailersAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)


    const handleCheck = (id) =>{
      trailers.forEach(trailer => {
          if(trailer._id === id) trailer.checked = !trailer.checked
            })

      setTrailers([...trailers])
    }
    const deleteTrailer = async(id, public_id) =>{
        console.log({id, public_id})
       try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteTrailer = axios.delete(`/api/trailers/${id}`, {
                 headers: {Authorization: token}
         })
 
         await destroyImg
         await deleteTrailer
         
         setCallback(!callback)
         setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }

     }
 const checkAll =() =>{
     trailers.forEach(trailer =>{
        trailer.checked = !isCheck

     })
     setTrailers([...trailers])
     setIsCheck(!isCheck)
 }
 const deleteAll =() =>{
    trailers.forEach(trailer =>{
         if(trailer.checked) deleteTrailer(trailer._id, trailer.images.public_id)
     })
 }
    if(loading) return <div><Loading /></div>
    return ( 
        <> 
         <Filters />
        {
            isArtist &&
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked ={isCheck} onChange={checkAll} />
                <button onClick ={deleteAll}>Delete All</button>
             </div>
        }
        <div className="trailers">
            {
                trailers.map(trailer =>{
                    return <TrailerAdvertisement key={trailer._id} trailer={trailer} 
                    isArtist = {isArtist} deleteTrailer = {deleteTrailer} handleCheck={handleCheck}/>
                })
            }
        </div>  
        <LoadMore />
        {trailers.length === 0 && <Loading />}
    {/*  { <NotFound />*/}
        
        </> 
    )
}


export default Trailers
