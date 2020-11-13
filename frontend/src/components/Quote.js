import React, {useState} from 'react';
import { getRequest } from './models';
import Transaction from './Transactions';


const Quote = (props) => {
    const [quote, setQuote] = useState([])
    const [isQuote, setIsQuote] = useState(false)
    const [errorTicker, setErrorTicker] = useState(false)

    
    const getListing = async () => {
        let data = await getRequest("/price/" + props.tick);
        console.log(data.error);
        if (data.error === "ticker not found"){
            setErrorTicker(true);
        } else {
        setQuote(data);
        setIsQuote(true);
        setErrorTicker(false);
        }   
    }


    return (
        <div>
            {isQuote ? 
            <>
                <h1>{quote.ticker}</h1>
                <p>{quote.price}</p>
                <Transaction tick={props.tick}/>
            </>
             : 
            <>
                <button type="submit" onClick={getListing}>Quote</button>
            </>
            }
            {errorTicker ? <h3>Ticker not found</h3> : <></>}
        </div>

    )
}
export default Quote