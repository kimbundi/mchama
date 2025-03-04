import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'



const List = () => {
  const url=" http://localhost:4000"

  const [list,setList] = useState([]);
  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/loan/list`)
    
    if(response.data.success) {
     
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
    fetchList();

  },[])
  const incomeMap = {
    "less_than_30000": "< 30,000",
    "between_30000_and_50000": "30,000 - 50,000",
    "more_than_50000": "> 50,000"
  };

  const removeLoan = async(loanId) =>{
   const response = await axios.post(`${url}/api/loan/remove`,{id:loanId})
   await fetchList();
   if(response.data.success) {
    toast.success(response.data.message)

   }
   else{
    toast.error("Error")
   }

  }

  
  return (


    <div className='list add flex-col'>
      <p> Loan Requests</p>
      <div className="list-table">
        <div className="list-table-format title">
         <b>name</b>
         <b>Lastname</b>
         <b>idnumber</b>
         <b>gender</b>
         <b>phonenumber</b>
         <b>dob</b>
         <b>Monthlyincome</b>
         <b>Loanrequired</b>
         <b>job</b>
        
         <b>Action</b>
        </div>
        {list.map((item,index)=>{
          
          
          <p>Monthly Income: {incomeMap[item?.monthlyincome] || "N/A"}</p>
          
          
          return(
            <div key={index} className='list-table-format'>
              <p>{item.name}</p>
              <p>{item.lastname}</p>
              <p>{item.idnumber}</p>
              <p>{item.gender}</p>
              <p>{item.phonenumber}</p>
              <p>{item.dob}</p>
              <p>Monthly Income: {incomeMap[item?.monthlyincome] || item?.monthlyincome || "N/A"}</p>
<p>Loan Required: {item?.loanrequired?.toLocaleString() || "N/A"}</p>

               
               
 

              
              <p>{item.job}</p>
              
          
              <p  onClick={()=>removeLoan(item._id)}   className='cursor'>x</p>











              </div>
              
          )
        })}
      </div>




    </div>
  )
}

export default List