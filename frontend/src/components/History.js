import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import { useStateWithSessionStorage } from './models';

function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await postRequest("transactions", {token: sessionStorage.getItem("token")});
      setTransactions(data)
      console.log(data)
    }
    getTransactions();
  }, [])

  return (
    <div>
      <h2>Balance: ${sessionStorage.getItem("balance")}</h2>
      <div>
        {/* { transactions.map((p) => <p>{p}</p>)} */}
      </div>
      
    </div>
  )
}

export default History;