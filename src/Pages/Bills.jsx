import React, { useEffect, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [summary, setSummary] = useState({
    paidCount: 0,
    unpaidCount: 0,
    paidTotal: 0,
    unpaidTotal: 0
  });


  const getPaidFromStorage = () => {
    const stored = localStorage.getItem("paidBills");
    return stored ? JSON.parse(stored) : [];
  };


  useEffect(() => {
    fetch("/bills.json")
      .then((res) => res.json())
      .then((data) => {
        const paidIds = getPaidFromStorage();
        const updated = data.map((bill) => ({
          ...bill,
          paid: paidIds.includes(bill.id),
        }));
        setBills(updated);
      });
  }, []);


  useEffect(() => {
    let filtered = [...bills];


    if (filterType !== "all") {
      filtered = filtered.filter((bill) => bill.bill_type === filterType);
    }


    if (statusFilter !== "all") {
      filtered = filtered.filter((bill) =>
        statusFilter === "paid" ? bill.paid : !bill.paid
      );
    }


    if (sortBy === "amount") {
      filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortBy === "due_date") {
      filtered.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    }

    setFilteredBills(filtered);
    calculateSummary(filtered);
  }, [filterType, statusFilter, sortBy, bills]);


  const handleMarkAsPaid = (id) => {
    const updated = bills.map((bill) =>
      bill.id === id ? { ...bill, paid: true } : bill
    );
    setBills(updated);


    const paidIds = getPaidFromStorage();
    const newPaidIds = [...new Set([...paidIds, id])];
    localStorage.setItem("paidBills", JSON.stringify(newPaidIds));
  };


  const calculateSummary = (data) => {
    let paidCount = 0,
      unpaidCount = 0,
      paidTotal = 0,
      unpaidTotal = 0;

    data.forEach((bill) => {
      if (bill.paid) {
        paidCount++;
        paidTotal += bill.amount;
      } else {
        unpaidCount++;
        unpaidTotal += bill.amount;
      }
    });

    setSummary({ paidCount, unpaidCount, paidTotal, unpaidTotal });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">আপনার বিল</h2>

      <div className="mb-4 text-sm text-gray-700">
        <p>
          ✅ পেইড: {summary.paidCount} বিল (৳{summary.paidTotal}) | ❌ আনপেইড:{" "}
          {summary.unpaidCount} বিল (৳{summary.unpaidTotal})
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="select select-bordered w-full md:w-auto"
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="all">সব ধরনের</option>
          <option value="electricity">বিদ্যুৎ</option>
          <option value="gas">গ্যাস</option>
          <option value="internet">ইন্টারনেট</option>
          <option value="water">পানি</option>
          <option value="mobile">মোবাইল</option>
          <option value="tv">টিভি</option>
          <option value="waste">বর্জ্য</option>
          <option value="telephone">টেলিফোন</option>
        </select>

        <select
          className="select select-bordered w-full md:w-auto"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="all">সব অবস্থা</option>
          <option value="paid">পেইড</option>
          <option value="unpaid">আনপেইড</option>
        </select>

        <select
          className="select select-bordered w-full md:w-auto"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="">কিভাবে সাজাবেন</option>
          <option value="amount">রাশি</option>
          <option value="due_date">সর্বশেষ তারিখ</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill) => (
          <div key={bill.id} className="card bg-base-100 shadow-md p-5">
            <img src={bill.icon} alt={bill.bill_type} className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold">{bill.organization}</h3>
            <p className="text-sm capitalize">প্রকার: {bill.bill_type}</p>
            <p className="text-sm">রাশি: ৳{bill.amount}</p>
            <p className="text-sm text-gray-500">
              শেষ তারিখ: {new Date(bill.due_date).toLocaleDateString()}
            </p>
            <p className="text-sm mt-2 flex items-center gap-2">
              অবস্থা:{" "}
              <span
                className={`font-semibold ${bill.paid ? "text-green-600" : "text-red-500"
                  }`}
              >
                {bill.paid ? "পেইড" : "আনপেইড"}
              </span>
              {bill.paid && <FcCheckmark />}
            </p>

            <div className="mt-4 flex gap-2 flex-wrap">
              {!bill.paid && (
                <button
                  onClick={() => handleMarkAsPaid(bill.id)}
                  className="btn btn-sm btn-primary"
                >
                  পেইড হিসেবে চিহ্নিত করুন
                </button>
              )}
              <NavLink to={`/bill/${bill.id}`} className="btn btn-sm btn-outline">
                বিস্তারিত দেখুন
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bills;
