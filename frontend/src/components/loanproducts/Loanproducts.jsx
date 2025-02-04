import React from 'react'
import './Loanproducts.css'
import { product_list } from '../../assets/assets'
const Loanproducts = ({category,setCategory}) => {
  return (
    <div  className='loan-products' id="loan-products">
        <h1>EXPLORE OUR PRODUCTS</h1>
        <p className='loan-products-text'>  Discover a wide range of loan products tailored to meet your financial needs. From personal loans to business financing, we have solutions designed to help you achieve your goals.</p>
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