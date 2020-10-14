import React, {useState} from 'react';
import { getRequest } from './models';


const Quote = () => {
    const [tick, setTick] = useState("")
    const [quote, setQuote] = useState([])

    
    const getListing = async () => {
        let data = await getRequest("/price/" + tick);
        setQuote(data)   
    }


    return (
        <div>
            {quote ? 
            <>
                <h1>{quote.ticker}</h1>
                <p>{quote.price}</p>
            </>
             : 
            <>
            <p></p>
            </>}
            <input type="text" onChange={e => setTick(e.target.value)} />
            <button type="submit" onClick={getListing}>Quote</button>
        </div>

    )
}
export default Quote