import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { storeContext } from "../../context/Storecontext";

const LoanTracking = () => {
  const { url, token } = useContext(storeContext);
  const navigate = useNavigate();
  const [loanDetails, setLoanDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState("");

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/loan/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setLoanDetails(response.data.data);
        } else {
          toast.error(response.data.message || "Hatukuweza kupata maelezo ya mkopo.");
        }
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        toast.error("Kuna tatizo. Tafadhali jaribu tena.");
      }
    };

    fetchLoanDetails();
  }, [url, token]);

  // Function to open the repayment popup
  const openRepaymentPopup = (loan) => {
    setSelectedLoan(loan);
    setShowPopup(true);
  };

  // Function to handle repayment submission
  const handleRepayment = async () => {
    if (!repaymentAmount || repaymentAmount <= 0) {
      toast.error("Tafadhali ingiza kiasi halali cha kulipa.");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/loan/repay`,
        { loanId: selectedLoan._id, amount: repaymentAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Malipo yako yamepokelewa kwa mafanikio!");
        setShowPopup(false);
        setRepaymentAmount(""); // Reset input field
      } else {
        toast.error(response.data.message || "Malipo yameshindwa.");
      }
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      toast.error("Kuna tatizo. Tafadhali jaribu tena.");
    }
  };

  return (
    <div className="tracking-container">
      <h2>Fuata Hali ya Mikopo Yako</h2>
      {loanDetails.length === 0 ? (
        <p>Hakuna mkopo uliowasilishwa.</p>
      ) : (
        loanDetails.map((loan, index) => (
          <div key={index} className="loan-info">
            <p><strong>Jina:</strong> {loan.name} {loan.lastname}</p>
            <p><strong>Nambari ya Kitambulisho:</strong> {loan.idnumber}</p>
            <p><strong>Kazi:</strong> {loan.job}</p>
            <p><strong>Jinsia:</strong> {loan.gender}</p>
            <p><strong>Nambari ya Simu:</strong> {loan.phonenumber}</p>
            <p><strong>Kiasi cha Mkopo Ulioomba:</strong> <span className="requested-loan">KSh {loan.loanrequired}</span></p>
            <p>
              <strong>Kiasi cha Mkopo Uliotengewa:</strong> 
              {loan.status === "Rejected" ? (
                <span className="rejected-loan">Mkopo Umekataliwa</span>
              ) : (
                <span className="approved-loan">KSh {loan.approvedLoanAmount || "Bado Hakujatolewa"}</span>
              )}
            </p>
            <p><strong>Hali ya Mkopo:</strong> <span className={`loan-status ${loan.status.toLowerCase()}`}>{loan.status || "Inasubiri Uidhinishaji"}</span></p>
            
            {/* Display Repayment Duration if Loan is Approved */}
            {loan.status === "Approved" && (
              <p><strong>Muda wa Kulipa:</strong> <span className="repayment-duration">{loan.repaymentDuration || "Haijabainishwa"}</span></p>
            )}

            {/* Repay Loan Button */}
            {loan.status === "Approved" && (
              <button className="repay-button" onClick={() => openRepaymentPopup(loan)}>
                Lipa Mkopo
              </button>
            )}
          </div>
        ))
      )}

      {/* Popup for Loan Repayment */}
      {showPopup && selectedLoan && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Lipa Mkopo</h3>
            <p><strong>Mkopo:</strong> KSh {selectedLoan.approvedLoanAmount}</p>
            <p><strong>Muda wa Kulipa:</strong> {selectedLoan.repaymentDuration || "Haijabainishwa"}</p>
            <input
              type="number"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(e.target.value)}
              placeholder="Ingiza kiasi cha kulipa"
            />
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleRepayment}>Thibitisha Malipo</button>
              <button className="cancel-button" onClick={() => setShowPopup(false)}>Funga</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanTracking;
