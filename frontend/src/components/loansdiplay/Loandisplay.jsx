import React, { useContext } from 'react'
import './Loandisplay.css'
import { storeContext } from '../../context/Storecontext'
import { Loanitems } from '../loanitems/Loanitems'

const Loandisplay = ({category}) => {
    const {services_list} = useContext(storeContext)
  return (
    <div className='loan-display' id="loan display">
      <h2>Gundua Mikopo na Suluhisho Zetu za Akiba.</h2>
      <div className="loan-display-list">
        {services_list.map((item,index)=>{
            if (category==="All" || category===item.category) {
                return (
                    <Loanitems  key={index} id={item._id} name={item.name} description={item.description}  price={item.price}  image={item.image} category={item.category}/>
    
                )
                
            }
          

        })}
      </div>


    </div>
  )
}

export default Loandisplay