import React, {useState} from 'react';



const Transaction = () => {
    const [shares, setShares] = useState(0)
    const [ticker, setTicker] = useState("")
    const [radio, setRadio] = useState("")

    function trade(radio) {
        console.log(radio)

    } 
    
    function handleChange(value) {
        setRadio(value)
        console.log(value)
    }
    

    return (
        <div>
            <input type="text" onChange={e => setTicker(e.target.value)} />
            <input type="text" onChange={e => setShares(e.target.value)} />
            <div>
                <button type="radio" value="Buy" checked={true} />
                <button type="radio" value="Sell" checked={false}/>
            </div>
            <button type="submit" onClick={trade}>Execute</button>
        </div>

    )
}
export default Transaction