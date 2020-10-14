import React from "react";
import { Link } from 'react-router-dom';
// import { getRequest } from './models';

export default function NavBar({ token, setToken, setBalance }) {

    const logout = () => {
        setToken("")
        setBalance(0)
    }

    // const logout = async () => {
    //     let data = await getRequest("/logout/" + token);
    // }

    let styles = {
        margin: '20px',
        width: '100%',
        height: '50px',
        backgroundColor: 'slategray',
      };
    return (
        <div style={styles}>
            { token ?
                <>
                 <Link to="/home">Home</Link>
                 <Link to="/history">History</Link>
                 <Link to="/trade">Trade</Link>
                 <Link to="/" onClick={logout}>Logout</Link>
                </>
                :
                <>
                <h1>logo here</h1>
                </>
            }
        </div>
    )
  }