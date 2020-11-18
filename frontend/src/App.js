import React from 'react';
import Footer from './components/Footer';
import { useStateWithSessionStorage } from './components/models';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Router from './components/Router';
import './App.css';

function App() {
  const [token, setToken] = useStateWithSessionStorage("token", "");
  const [balance, setBalance] = useStateWithSessionStorage("balance", 0);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token={token} setToken={setToken} setBalance={setBalance}/>
        <Router token={token} setToken={setToken} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
