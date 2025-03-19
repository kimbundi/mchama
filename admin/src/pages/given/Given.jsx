import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllLoans } from '../../apis';
import './Given.css';

const LoanStatus = () => {
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState("All"); // Default: Show all loans

    const fetchList = async () => {
        try {
            const response = await getAllLoans();
            if (response?.success && Array.isArray(response.data)) {
                setList(response.data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching loans: " + (error.response?.data?.message || error.message));
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    // Filter loans based on selection
    const filteredLoans = list.filter((loan) => {
        if (filter === "All") return true;
        return loan.status === filter;
    });

    return (
        <div className='loan-status'>
            <h2>Loan Status</h2>
            <Link to="/requests" className="back-link">Back to Loan Requests</Link>

            {/* Filter Dropdown */}
            <div className="filter-section">
                <label>Filter Loans:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {/* Display Filtered Loans */}
            <div className="loan-table">
                <h3>{filter} Loans</h3>
                {filteredLoans.length === 0 ? (
                    <p>No {filter.toLowerCase()} loans found.</p>
                ) : (
                    <>
                        <div className="loan-table-header">
                            <b>Loan ID</b>
                            <b>Name</b>
                            <b>Phone Number</b>
                            {filter === "Approved" && <b>Approved Amount</b>}
                            {filter === "Approved" && <b>Repayment Duration</b>} {/* ✅ Added */}
                        </div>
                        {filteredLoans.map((item) => (
                            <div key={item._id} className='loan-table-row'>
                                <p>{item._id.substring(0, 5)}</p>
                                <p>{item.name} {item.lastname}</p>
                                <p>{item.phonenumber}</p>
                                {filter === "Approved" && (
                                    <>
                                        <p>{item.approvedLoanAmount?.toLocaleString() || "N/A"}</p>
                                        <p>{item.repaymentDuration || "Not Set"}</p> {/* ✅ Added */}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoanStatus;
