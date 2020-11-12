import React, { useState, useEffect } from 'react';
import { useStateWithSessionStorage } from './models';
import { postRequest } from './models';

const Home = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [username, setUserName] = useState("");
  const [balance, setBalance] = useStateWithSessionStorage("balance", 0);

  useEffect(() => {
    const getPositions = async () => {
      const data = await postRequest("portfolio", {token: sessionStorage.getItem("token")});
      setPortfolio(data.positions);
      setUserName(data.username);
      setBalance(data.balance.toFixed(2));
    }
    getPositions();
  }, [setBalance])

  return (
    <div className='home'>
      <div>
        <h2>{username}</h2>
        <h2>Balance: ${balance}</h2>
        { portfolio.map((p) => <p>{p}</p>)}
      </div>
    </div>
  )

}
export default Home;