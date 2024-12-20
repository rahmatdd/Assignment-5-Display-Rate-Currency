import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableCurrency() {
  const [currency, setCurrency] = useState([])

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiKey = import.meta.env.VITE_API_KEY

    axios
      .get(`${apiUrl}?apikey=${apiKey}`)
      .then((res) => {
        setCurrency(res.data.rates)
      })
      .catch((error) => {
        console.error("Terjadi error dalam pengambilan data", error)
      });
  }, []);

  const desiredCurrency = ["IDR", "CAD", "EUR", "JPY", "CHF", "GBP"]

  let filteredCurrency = desiredCurrency.map(currencyCode => ({
    currency: currencyCode,
    rate: currency[currencyCode]
  }))
  // console.log(filteredCurrency)

  function countWeBuy(uangAwal, persen) {
    let ubahKeNumber = parseFloat(uangAwal)
    let tambahan = ubahKeNumber * (persen / 100)
    let totalUang = ubahKeNumber + tambahan
  
    return totalUang
  }

  function countWeSell(uangAwal, persen) {
    let ubahKeNumber = parseFloat(uangAwal)
    let tambahan = ubahKeNumber * (persen / 100)
    let totalUang = ubahKeNumber - tambahan
  
    return totalUang
  }

  return (
    <div style={{ backgroundColor: "#FA812F", minHeight: "100vh" }} className="d-flex align-items-center justify-content-center">
      <div className="container">
        <table className="table table-border table-hover my-5">
          <thead>
            <tr>
              <th scope="col">Currency</th>
              <th scope="col">We Buy</th>
              <th scope="col">Exchange Rate</th>
              <th scope="col">We Sell</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredCurrency.map(item => (
              <tr key={item.currency}>
                <td>{item.currency}</td>
                <td>{countWeBuy(item.rate, 5)}</td>
                <td>{item.rate}</td>
                <td>{countWeSell(item.rate, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='text-center text-white'>
            <p style={{ margin: 0 }}>Rates are based from 1 USD.</p>
            <p style={{ margin: 0 }}>This application uses API from https://currencyfreaks.com.</p>
        </div>
      </div>
    </div>
  );
}

export default TableCurrency;
