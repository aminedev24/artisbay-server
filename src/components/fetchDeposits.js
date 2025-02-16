import { useEffect, useState } from "react";

export default function DepositsTable() {
    const [deposits, setDeposits] = useState([]);
    const [filteredDeposits, setFilteredDeposits] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // API URL setup
    const apiUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost/artisbay-server-clean/server'
            : '/server';

    useEffect(() => {
        fetch(`${apiUrl}/fetchDeposits.php`, {
            method: "GET",
            credentials: "include", // Ensures cookies are sent with the request
        })
            .then((response) => response.json())
            .then((data) => {
                setDeposits(data);
                setFilteredDeposits(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Filter deposits based on date range and search term
    const filterDeposits = () => {
        let filtered = deposits;

        if (startDate) {
            filtered = filtered.filter(deposit => deposit.date >= startDate);
        }

        if (endDate) {
            filtered = filtered.filter(deposit => deposit.date <= endDate);
        }

        setFilteredDeposits(filtered);
    };

    // Clear filters
    const clearFilters = () => {
        setStartDate("");
        setEndDate("");
        setFilteredDeposits(deposits);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Account</h1>

            {/* Filter Inputs */}
            <div className="filter-container">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="End Date"
                />
              
                <button
                    onClick={filterDeposits}
                    className="filter-button search"
                >
                    Search
                </button>
                <button
                    onClick={clearFilters}
                    className="filter-button clear"
                >
                    Clear
                </button>
            </div>

            {/* Deposits Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Guaranty</th>
                        <th className="border p-2">Extra Guaranty</th>
                        <th className="border p-2">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeposits.length > 0 ? (
                        filteredDeposits.map((deposit) => (
                            <tr key={deposit.id} className="border">
                                <td className="border p-2">{deposit.date}</td>
                                <td className="border p-2">{deposit.amount.toLocaleString()} {deposit.currency}</td>
                                <td className="border p-2">{deposit.guaranty.toLocaleString()} {deposit.currency}</td>
                                <td className="border p-2">{deposit.extra_guaranty.toLocaleString()} {deposit.currency}</td>
                                <td className="border p-2">{deposit.leftover.toLocaleString()} {deposit.currency}</td>



                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
