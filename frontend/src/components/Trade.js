import React, {useState} from 'react';
import Quote from './Quote';
// import Transaction from './Transactions';
import { useStateWithSessionStorage } from './models';

const Trade = () => {
  const [balance, setBalance] = useStateWithSessionStorage("balance", 0);
  const [tick, setTick] = useState("")


  return (
    <div className='trade'>
      <h2>Balance: ${balance}</h2>
      <div>
        <input type="text" 
          onKeyDown={e => /[\+\-\.\,\d]$/.test(e.key) && e.preventDefault()} 
          onChange={e => setTick(e.target.value)} />
        <Quote tick={tick.toUpperCase()}/>
      </div>
    </div>
  )
}

export default Trade