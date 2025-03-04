import Loan from "../models/loanModel.js";


//add loan
const addLoan = async (req, res) => {
    console.log("Received Data in Backend:", req.body); // Log the request body

    try {
        // Create a new Loan document
        const loan = new Loan({
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
            relationship: req.body.relationship
        });

  // Save to MongoDB
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
        const Loans = await Loan.find({});  // Use Loan instead of loanModel
        res.json({ success: true, data: Loans });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
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

export { addLoan, listLoan, removeLoan };
