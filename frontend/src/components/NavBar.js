import React from "react";
import { Link } from 'react-router-dom';

export default function NavBar({ token, setToken, setBalance }) {
    const logout = () => {
        setToken("")
        setBalance(0)
    }

    return (
        <div className="navbar">
            { token ?
                <>
                 <Link className="navtext" to="/home">Home</Link>
                 <Link className="navtext" to="/history">History</Link>
                 <Link className="navtext" to="/trade">Trade</Link>
                 <Link className="navtext" to="/" onClick={logout}>Logout</Link>
                </>
                :
                <>
                <Link className="navtext" to="/login">Login</Link>
                <Link className="navtext" to="/signup">Signup</Link>
                </>
            }
        </div>
    )
  }