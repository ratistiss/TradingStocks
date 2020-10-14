import React, { useState } from 'react'
import { postRequest } from './models'
import { Link } from 'react-router-dom'

const Login = (setToken) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    console.log(name)




    const getLogin = async () => {
        const data = await postRequest("login", {"username": name, "password":password});
        // data is likely an object, will need to access a certian key
        this.setToken(data.session_id)
    }
        


    return(
        <div>
            <input type="text" onChange={e => setName(e.target.value)} />
            <input type="text" onChange={e => setPassword(e.target.value)} />
            <button type="submit" onClick={e => getLogin(name,password)}>Submit</button>
            <Link to="/signup">Sign up!</Link>
        </div>
    )
}

export default Login