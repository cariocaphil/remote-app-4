import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";

const App = () => {
  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CurrencyConverter />
    </div>
  );
};

export default App;
