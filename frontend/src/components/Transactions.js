import React, {useState} from 'react';
import { postRequest } from './models';




const Transaction = (props) => {
    const [shares, setShares] = useState(0);
    const [ticker, setTicker] = useState(props.tick);
    const [errorFunds, setErrorFunds] = useState(false)
    const [errorShares, setErrorShares] = useState(false)
    const buy = 'buy';
    const sell = 'sell';

    async function trade(trade_type) {
        const data = await postRequest(trade_type, {token: sessionStorage.getItem("token"), "ticker": ticker, "volume": shares});
        console.log(data)
        if (data.error === "insufficient funds"){
            setErrorFunds(true);
            setErrorShares(false);
        } else if(data.error === "insufficient shares"){
            setErrorShares(true);
            setErrorFunds(false);
        } else {
            window.location.reload(false);
            setErrorFunds(false);
            setErrorShares(false);
        }  

    } 
    

    return (
        <div>
            <input type="number" min='1' 
                onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} 
                onChange={e => setShares(e.target.value)} placeholder='shares'/>
            <button type="submit" onClick={e => trade(buy)}>Buy</button>
            <button type="submit" onClick={e => trade(sell)}>Sell</button>
            {errorFunds ? <h3>Please check you account balance</h3> : <></>}
            {errorShares ? <h3>Not enough Shares</h3> : <></>}
        </div>

    )
}
export default Transaction