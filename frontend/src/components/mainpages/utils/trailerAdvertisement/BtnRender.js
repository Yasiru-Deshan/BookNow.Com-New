import React, {useContext} from 'react'



import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({trailer, deleteTrailer}) {
    const state = useContext(GlobalState)
   const [isArtist] =state.userAPI.isArtist
   const addFavourite = state.userAPI.addFavourite

   
    return ( 
        <div className="row_btn">
            {
                isArtist ?
                <>
                <Link id="btn_buy" to="#!"
                 onClick={() => deleteTrailer(trailer._id, trailer.images.public_id)}>
                Delete
            </Link>
            <Link id="btn_view" to={`/edit_trailer/${trailer._id}`} >
             Edit
            </Link>
            </>
            

      : <>
             <Link id="btn_buy" to="#!" onClick ={() => addFavourite(trailer)}>
             Favourite
            </Link>
            <Link id="btn_view" to={`/detail/${trailer._id}`} >
            Info
            </Link>
        </>
        }
        </div>
    )
}

export default BtnRender
