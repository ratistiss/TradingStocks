import React from 'react';
import Quote from './Quote';
import Transaction from './Transactions';

export default function Trade({ balance, setBalance }){

  return (
    <div>
      <h2>Balance: ${balance}</h2>
      <div style={{display: "flex"}}>
        <Transaction />
        <Quote />
      </div>
    </div>
  )
}