import { useState, useEffect } from "react";

export default function App() {
  const [currOne, setCurrOne] = useState("EUR");
  const [currTwo, setCurrTwo] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function callback() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currOne}&to=${currTwo}`
        );

        const data = await res.json();

        console.log(data);
        // setAmount(amount);
        setConverted(data.rates[currTwo]);
        setIsLoading(false);
      }
      if (currOne === currTwo) return setConverted(amount);
      callback();
    },

    [amount, currOne, currTwo]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disable={isLoading}
      />
      <select
        value={currOne}
        onChange={(e) => setCurrOne(e.target.value)}
        disable={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currTwo}
        onChange={(e) => setCurrTwo(e.target.value)}
        disable={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>{converted}</p>
    </div>
  );
}
