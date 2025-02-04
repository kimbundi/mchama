import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import Loanproducts from '../../components/loanproducts/Loanproducts'
import Loandisplay from '../../components/loansdiplay/Loandisplay'
import Appdownload from '../../components/appdownload/Appdownload'


const Home = () => {

  const[category,setCategory] = useState('All');

  return (
    <div>

        <Header/>
        <Loanproducts  category={category} setCategory={setCategory}/>
        <Loandisplay category={category}/>
        <Appdownload/>
    </div>
  )
}

export default Home