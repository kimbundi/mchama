import React from 'react'
import './Cart.css'

const Cart = () => {
  return (
    <form action="" className='place-loan'>
      <div className="place-loan-left">
        <p className='title'>Fill Details to receive Loan</p>
        <div className="multi-fields">
          <input type="text"  placeholder='First Name'/>
          <input type="text"  placeholder='Last Name' />
        </div>
        <input type="text"  placeholder='National ID/Passport Number' />
        <input type="email"   placeholder='Email address'/>
        <input type="number"  placeholder='Phone Number' />
        <div className="multi-fields">
          <input type="text"  placeholder='Home Address'/>
          <input type="text"  placeholder='Postal code' />
        </div>
        <div className="multi-fields">
          <input type="text"  placeholder='Employment Status'/>
          <input type="text"  placeholder='Monthly income' />
        </div>
      
      </div>
      <div className="place-loan-right">

        
      <div className="multi-fields">
          <input type="text"  placeholder='Loan Amount Requested'/>
          <input type="text"  placeholder='Loan Purpose' />
          <input type="text"  placeholder='Loan Repayment Duration' />


        </div>
        <div className="multi-fields">
          <input type="text"  placeholder='Next of Kin Name'/>
          <input type="text"  placeholder='Next of Kin Phone number' />
          <input type="text"  placeholder='Relationship' />


        </div>
         <div className='place-btn'>
        <input type="checkbox" name="" id=""   />
        <p>By clicking this,you agree to our terms and conditions</p>
        <button>SUBMIT</button>
        </div>

      </div>


    </form>
  )
}

export default Cart