import Loan from "../models/loanModel.js";


//add loan
const addLoan = async (req, res) => {
    console.log("Received Data in Backend:", req.body);

    try {
        const loan = new Loan({
            userId: req.user._id, // Attach user ID from token
            name: req.body.name,
            lastname: req.body.lastname,
            idnumber: req.body.idnumber,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
            dob: req.body.dob,
            monthlyincome: req.body.monthlyincome,
            loanrequired: req.body.loanrequired,
            job: req.body.job,
            dependent: req.body.dependent,
            dependnumber: req.body.dependnumber,
            relationship: req.body.relationship,
            status: "Pending",
            repaymentDuration: req.body.repaymentDuration,
        });

        await loan.save();
        res.status(201).json({ success: true, message: "Loan added successfully!", loan });

    } catch (error) {
        console.error("Error saving loan:", error);
        res.status(500).json({ success: false, message: "Database error", error: error.message });
    }
};

// Get all loan details
const listLoan = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from token
        const loans = await Loan.find({ userId });

        if (loans.length === 0) {
            return res.status(404).json({ success: false, message: "No loans found for this user." });
        }

        res.json({ success: true, data: loans });

    } catch (error) {
        console.error("Error fetching loans:", error);
        res.status(500).json({ success: false, message: "Error fetching loans" });
    }
};

// Remove loan
const removeLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.body.id);  // Use Loan instead of loanModel

        if (!loan) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }

        await Loan.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Loan details removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
//update loan
const updateLoanStatus = async (req, res) => {
    try {
        const { id, status, approvedLoanAmount, repaymentDuration, userId } = req.body;

        console.log("Updating Loan:", { id, status, approvedLoanAmount, repaymentDuration, userId });

        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Loan ID and status are required." });
        }

        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }

        // ✅ Ensure userId remains the same
        loan.userId = loan.userId || userId;

        // ✅ Update status
        loan.status = status;

        // ✅ Update approved amount only if provided
        if (approvedLoanAmount !== undefined) {
            loan.approvedLoanAmount = approvedLoanAmount;
        }

        // ✅ Update repayment duration only if provided
        if (repaymentDuration !== undefined && repaymentDuration.trim() !== "") {
            loan.repaymentDuration = repaymentDuration;
        }

        await loan.save();

        res.json({ success: true, message: "Loan status updated successfully", loan });
    } catch (error) {
        console.error("Error updating loan:", error);
        res.status(500).json({ success: false, message: "Error updating loan" });
    }
};

const getAllLoans = async (req, res) => {
    try {
        // Fetch all loan applications from the database
        const loans = await Loan.find();

        if (loans.length === 0) {
            return res.status(404).json({ success: false, message: "No loans found." });
        }

        res.json({ success: true, data: loans });

    } catch (error) {
        console.error("Error fetching all loans:", error);
        res.status(500).json({ success: false, message: "Error fetching loans" });
    }
};




export { addLoan, listLoan, removeLoan,updateLoanStatus,getAllLoans };
