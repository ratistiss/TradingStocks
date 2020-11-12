import React, {useState} from 'react';
import { getRequest } from './models';
import Transaction from './Transactions';


const Quote = (props) => {
    const [quote, setQuote] = useState([])
    const [isQuote, setIsQuote] = useState(false)

    
    const getListing = async () => {
        let data = await getRequest("/price/" + props.tick);
        setQuote(data);
        setIsQuote(true);   
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
                {/* <input type="text" onChange={e => setTick(e.target.value)} /> */}
                <button type="submit" onClick={getListing}>Quote</button>
            </>
            }
        </div>

    )
}
export default Quote