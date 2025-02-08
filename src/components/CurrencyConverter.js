import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000); // Auto-refresh every 30s

    return () => clearInterval(interval);
  }, [baseCurrency]);

  const majorCurrencies = ["EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"];

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", maxWidth: "400px", margin: "auto", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
      <h2>Live Currency Converter</h2>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ marginLeft: "10px", padding: "5px", width: "100px" }} />
      </label>

      <br />

      <label>
        Base Currency:
        <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} style={{ marginLeft: "10px", padding: "5px" }}>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
        </select>
      </label>

      {loading ? (
        <p>Loading exchange rates...</p>
      ) : (
        <table style={{ margin: "auto", marginTop: "10px", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #000", padding: "5px" }}>Currency</th>
              <th style={{ borderBottom: "2px solid #000", padding: "5px" }}>Converted</th>
            </tr>
          </thead>
          <tbody>
            {majorCurrencies.map((currency) => (
              <tr key={currency}>
                <td style={{ padding: "5px" }}>{currency}</td>
                <td style={{ padding: "5px" }}>{(amount * rates[currency]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrencyConverter;
