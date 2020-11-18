import React from 'react';
import Quote from './Quote';
import { useStateWithSessionStorage } from './models';

const Trade = () => {
  const [balance] = useStateWithSessionStorage("balance", 0);


  return (
    <div className="trade">
      <h2>Balance: ${balance}</h2>
      <div>
        <Quote />
      </div>
    </div>
  )
}

export default Trade;