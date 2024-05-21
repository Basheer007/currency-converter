import { useEffect, useState } from "react";
import currencypng from "./assets/currency-image.png"
import axios from "axios";


export default function App() {


  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setTocurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    const fetchCurrecny = async () => {
      const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      try {
        const response = await axios.get(url)
        setExchangeRate(response.data.rates[toCurrency])

      } catch (error) {
        if (error) {
          console.log(error);
          alert(`error occured while converting`)
        }
      }
    }
    fetchCurrecny()
  }, [fromCurrency, toCurrency])


  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2))
    }
  }, [amount, exchangeRate])


  function handleamount(e) {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value)
  }
  return (
    <>
      <main className=" bg-gradient-to-tl relative from-rose-500 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="realtive  backdrop-blur-md p-2 border z-20 border-white">
          <div className="flex items-center justify-center bg-pink-300 p-2">
            <img src={currencypng} className="h-[100px] rounded-xl" />
          </div>



          <div className=" flex flex-col gap-2">

            <div className=" border-y-2 border-dashed border-black my-4">
              <h1 className="font-outfit text-white text-2xl">Currency Converter</h1>
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-white font-outfit">Amount</label>
              <input type="text" placeholder="Amount to convert" className="focus:outline-none px-2" value={amount} onChange={(e) => handleamount(e)} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="from" className="text-white font-outfit">From Currency</label>
              <select name="from amount" id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                <option value="INR">India (INR)</option>
                <option value="USD"> United States Dollar (USD)</option>
                <option value="GBP">  British Pound Sterling (GBP)</option>
                <option value="EUR">   Euro (EUR)</option>
                <option value="CAD">   Canadian Dollar (CAD)</option>
                <option value="AUD"> Australian Dollar (AUD)</option>
                <option value="JPY">   Japanese Yen (JPY)</option>
                <option value="CHF">   Swiss Franc (CHF)</option>
                <option value="SEK">   Swedish Krona (SEK)</option>
                <option value="DKK"> Danish Krone (DKK)</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="to" className="text-white font-outfit">To Currency</label>
              <select name="from amount" id="from" value={toCurrency} onChange={(e) => setTocurrency(e.target.value)}>
                <option value="INR">India (INR)</option>
                <option value="USD"> United States Dollar (USD)</option>
                <option value="GBP">  British Pound Sterling (GBP)</option>
                <option value="EUR">   Euro (EUR)</option>
                <option value="CAD">   Canadian Dollar (CAD)</option>
                <option value="AUD"> Australian Dollar (AUD)</option>
                <option value="JPY">   Japanese Yen (JPY)</option>
                <option value="CHF">   Swiss Franc (CHF)</option>
                <option value="SEK">   Swedish Krona (SEK)</option>
                <option value="DKK"> Danish Krone (DKK)</option>
              </select>
            </div>

            <div className="border border-black p-2">
              <h1 className="text-white  text-center">{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</h1>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
