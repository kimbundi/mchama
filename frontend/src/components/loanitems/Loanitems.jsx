import React from 'react'
import './Loanitems.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

export const Loanitems = ({id,name,price,description,image,category}) => {
  return (
    <div className='loan-item' id='loanitem'>
        <div className="loan-item-img-container">
            <img className='loan-item-img' src={image} alt=""   />
            {!category.includes("Mikopo")?(
                <div className="loan-button">
                   <Link to='/mchama'><button>Jiunge sasa</button></Link>
                </div>
            ): (
                <div className="loan-button">
               <Link to='/cart'><button>Omba sasa</button></Link> 
            </div>

            )}
       


                       

        </div>
        <div className="loan-item-info">
            <div className="loan-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />

            </div>
            <p className="loan-item-desc">{description}</p>
            <p className="loan-item-price"> min kes {price}</p>
        </div>
    </div>
  )
}
