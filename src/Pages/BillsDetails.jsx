
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { WalletContext } from "../Providers/WalletProvider";

const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const billId = parseInt(id);
  const [bill, setBill] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { balance, deductBalance, topUpBalance } = useContext(WalletContext);

  useEffect(() => {
    fetch("/bills.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item.id === billId);
        setBill(selected);

        const paid = JSON.parse(localStorage.getItem("paidBills") || "[]");
        setIsPaid(paid.includes(billId));
      });
  }, [billId]);

  const handlePay = () => {
    if (bill.amount > balance) {
      alert("যতটুকু ব্যালেন্স আছে, তা যথেষ্ট নয়।");
      return;
    }

    deductBalance(bill.amount);

    const paidBills = JSON.parse(localStorage.getItem("paidBills") || "[]");
    const updatedPaid = [...new Set([...paidBills, billId])];
    localStorage.setItem("paidBills", JSON.stringify(updatedPaid));
    setIsPaid(true);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTopUp = () => {
    topUpBalance(500);
  };

  if (!bill) return <p className="p-6">বিলের বিস্তারিত লোড হচ্ছে...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl relative mt-5">
      <h2 className="text-2xl font-bold mb-4">বিলের বিস্তারিত</h2>

      <button className="btn btn-sm btn-outline mb-4" onClick={() => navigate(-1)}>
        ← ফিরে যান
      </button>

      <div className="mb-4">
        <img src={bill.icon} alt={bill.bill_type} className="w-16 h-16" />
      </div>

      <div className="space-y-2 mb-6">
        <p><strong>সংস্থা:</strong> {bill.organization}</p>
        <p><strong>প্রকার:</strong> {bill.bill_type}</p>
        <p><strong>রাশি:</strong> ৳{bill.amount}</p>
        <p><strong>শেষ তারিখ:</strong> {new Date(bill.due_date).toLocaleDateString()}</p>
        <p className="flex items-center gap-2">
          <strong>অবস্থা:</strong>
          <span className={isPaid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
            {isPaid ? "পেইড" : "আনপেইড"}
          </span>
          {isPaid && <FcCheckmark title="পেইড" />}
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-lg font-bold mb-2">আপনার ওয়ালেট</h3>
        <p>ব্যালেন্স: <span className="font-semibold text-blue-700">৳{balance.toFixed(2)}</span></p>
        <button className="btn btn-sm mt-2" onClick={handleTopUp}>টপ আপ +৳500</button>
      </div>

      <button
        className="btn btn-primary"
        onClick={handlePay}
        disabled={isPaid}
      >
        {isPaid ? "Already Paid" : `পে করুন ৳${bill.amount}`}
      </button>

      {showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success">
            <span>✅ পেমেন্ট সফল!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
