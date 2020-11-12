import React, {useState} from 'react';
import { postRequest } from './models';




const Transaction = (props) => {
    const [shares, setShares] = useState(0);
    const [ticker, setTicker] = useState(props.tick);
    const [radio, setRadio] = useState("");
    const [trade_type, setTradeType] = useState("")
    const buy = 'buy';
    const sell = 'sell';

    async function trade(trade_type) {
        const data = await postRequest(trade_type, {token: sessionStorage.getItem("token"), "ticker": ticker, "volume": shares});
        console.log(data)
        window.location.reload(false);

    } 
    
    function handleChange(value) {
        setRadio(value)
        console.log(value)
    }
    

    return (
        <div>
            <input type="text" onChange={e => setShares(e.target.value)} placeholder='shares'/>
            <button type="submit" onClick={e => trade(buy)}>Buy</button>
            <button type="submit" onClick={e => trade(sell)}>Sell</button>
        </div>

    )
}
export default Transaction