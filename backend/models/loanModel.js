import mongoose from "mongoose"


const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    idnumber: { type: String, required: true }, // Changed to String
    gender: { type: String, required: true},
    phonenumber: { type: String, required: true },
    dob: { type: Date, required: true },
    monthlyincome: { type: String, required: true },
    loanrequired: { type: Number, required: true, min: 1 },
    job: { type: String, required: true },
    dependent: { type: String, required: true }, // Corrected spelling
    dependnumber: { type: String, required: true },
    relationship: { type: String, required: true }, // Lowercased for consistency
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],  // Allowed values
        default: "Pending"  // Default status
    },
    approvedLoanAmount: { type: Number, default: 0 },
    repaymentDuration: { type: String, default: "Not Set" }, // ✅ Ensure default value




},{ timestamps: true })
const Loan = mongoose.models.loan || mongoose.model("loan",loanSchema)

export default Loan;