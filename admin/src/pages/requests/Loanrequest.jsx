import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllLoans, updateLoanStatus } from '../../apis'; // Use the same API structure
import './Loanrequest.css';

const LoanRequests = () => {
    const [list, setList] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [status, setStatus] = useState('');
    const [approvedAmount, setApprovedAmount] = useState('');
    const [repaymentDuration, setRepaymentDuration] = useState(''); // ✅ New State
    
    useEffect(() => {
        fetchList();
    }, []);

    const fetchList = async () => {
        try {
            const response = await getAllLoans();
            console.log("Loan Data:", response);
            
            if (response?.success && Array.isArray(response.data)) {
                setList(response.data);
            } else {
                toast.error("Failed to fetch loans");
            }
        } catch (error) {
            console.error("Error fetching loans:", error);
            toast.error("Error fetching loans: " + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdate = async () => {
        if (!status) {
            toast.error("Please select a status");
            return;
        }
    
        try {
            const response = await updateLoanStatus(
                selectedLoan._id, 
                status, 
                status === "Approved" ? approvedAmount : undefined,
                repaymentDuration,  // ✅ Include Repayment Duration
                selectedLoan.userId // Ensure userId is sent
            );
    
            if (response.success) {
                toast.success(`Loan status updated to ${status} successfully`);
                fetchList(); // Refresh list
                setSelectedLoan(null);
                setStatus('');
                setApprovedAmount('');
                setRepaymentDuration(''); // ✅ Reset duration field
            } else {
                toast.error("Failed to update loan status. Please try again.");
            }
        } catch (error) {
            console.error("Error updating loan status:", error);
            toast.error("Error updating loan status: " + (error.response?.data?.message || error.message));
        }
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
                            <p>{item.monthlyincome}</p>
                            <p>{item.loanrequired.toLocaleString()}</p>
                            <p>{item.job}</p>
                            <p 
                                onClick={() => {
                                    console.log("Selected Loan:", item);
                                    setSelectedLoan(item);
                                }} 
                                className='update-btn'
                            >
                                Update
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No loan requests available.</p>
                )}
            </div>

            {selectedLoan && (
                <div className='update-section' style={{ display: 'block' }}>
                    <h3>Update Loan Status</h3>
                    <p>Loan ID: {selectedLoan._id}</p>
                    <select value={status} onChange={(e) => {
                        console.log("Selected Status:", e.target.value);
                        setStatus(e.target.value);
                    }}>
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    {status === "Approved" && (
                        <>
                            <input
                                type="number"
                                placeholder="Approved Loan Amount"
                                value={approvedAmount}
                                onChange={(e) => {
                                    console.log("Approved Amount:", e.target.value);
                                    setApprovedAmount(e.target.value);
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Repayment Duration (Months)" // ✅ New Input
                                value={repaymentDuration}
                                onChange={(e) => {
                                    console.log("Repayment Duration:", e.target.value);
                                    setRepaymentDuration(e.target.value);
                                }}
                            />
                        </>
                    )}
                    <button onClick={handleUpdate}>Confirm Update</button>
                </div>
            )}
        </div>
    );
};

export default LoanRequests;
