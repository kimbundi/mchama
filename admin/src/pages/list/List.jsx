import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllLoans,removeLoan } from '../../apis'; // Import API functions
import './List.css';

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);
  const fetchLoans = async () => {
    try {
      const response = await getAllLoans();
      console.log(response)
      // Debugging
  
      if (response && response.success && Array.isArray(response.data)) {
        setList(response.data); // Ensure it is an array before setting state
      } else {
        toast.error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Error fetching loans: " + error.message);
    }
  };
  const handleDelete = async (loanId) => {
    try {
      const response = await removeLoan(loanId);
      if (response.success) {
        toast.success(response.message);
        fetchLoans(); // Refresh list
      } else {
        toast.error("Error deleting loan");
      }
    } catch (error) {
      toast.error("Error deleting loan: " + error.message);
    }
  };

  const incomeMap = {
    "less_than_30000": "< 30,000",
    "between_30000_and_50000": "30,000 - 50,000",
    "more_than_50000": "> 50,000",
  };

  return (
    <div className='list add flex-col'>
      <p>Loan Requests</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Lastname</b>
          <b>ID Number</b>
          <b>Gender</b>
          <b>Phone No</b>
          <b>Income</b>
          <b>Loan</b>
          <b>Job</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className='list-table-format'>
              <p>{item.name}</p>
              <p>{item.lastname}</p>
              <p>{item.idnumber}</p>
              <p>{item.gender}</p>
              <p>{item.phonenumber}</p>
              <p>{incomeMap[item?.monthlyincome] || "N/A"}</p>
              <p>{item?.loanrequired?.toLocaleString() || "N/A"}</p>
              <p>{item.job}</p>
              <p onClick={() => handleDelete(item._id)} className='delete-btn'>Delete</p>
            </div>
          ))
        ) : (
          <p>No loan requests available.</p>
        )}
      </div>
    </div>
  );
};

export default List;
