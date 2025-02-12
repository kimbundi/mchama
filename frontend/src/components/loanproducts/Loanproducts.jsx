import React from 'react'
import './Loanproducts.css'
import { product_list } from '../../assets/assets'
const Loanproducts = ({category,setCategory}) => {
  return (
    <div  className='loan-products' id="loan-products">
        <h1>chunguza bidhaa zetu</h1>
        <p className='loan-products-text'>  Gundua aina mbalimbali za bidhaa za mikopo zilizoundwa ili kukidhi mahitaji yako ya kifedha. Kuanzia mikopo ya kibinafsi hadi ufadhili wa biashara, tunayo suluhisho zilizoundwa kukusaidia kufikia malengo yako</p>
        <div className="explore-products-list">
            {product_list.map((item,index)=>{
                return (
                    <div   onClick={()=>setCategory(prev=>prev === item.product_name?"All" : item.product_name)}   key={index}  className='explore-products-list-item'>
                        <img  className={category===item.product_name?"active": ""}   src={item.product_image} alt="" />
                        <p>{item.product_name}</p>


                    </div>
                )
            })}
        </div>

        <hr/>




    </div>
  )
}

export default Loanproducts