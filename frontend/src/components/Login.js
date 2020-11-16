import React, { useState } from 'react'
import { postRequest } from './models'
import { Link } from 'react-router-dom'

const Login = (setToken) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(false)




    const getLogin = async () => {
        // const data = await postRequest("login", {"username": name, "password":password});
        try {
            const data = await postRequest("login", {"username": name, "password":password});
            sessionStorage.setItem("token", data.session_id);
            window.location.reload(false);
        }
        catch(err) {
            setErr(true)
        }

    }
        


    return(
        <div className="s">
            <input type="text" onChange={e => setName(e.target.value)} />
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <button type="submit" onClick={e => getLogin(name,password)}>Submit</button>
            <Link to="/signup">Sign up!</Link>
            {err ? <h3>Oh No! we have an error, do you have an account?</h3> : <></>}
        </div>
    )
}

export default Login