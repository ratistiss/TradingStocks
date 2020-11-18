import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import History from './History';
import Trade from './Trade';
import Home from './Home';

const Router = ({ token, setToken }) => {
  return (
    <div>
      { token ? 
        <>
          <Redirect from="/" to="/home" />
          <Route path="/trade" component={Trade} />
          <Route path="/history" component={History} />
          <Route path="/home" component={Home} />
        </>
        :
        <>
          <Redirect from="/" to="/login" />
          <Route path="/login" >
            <Login setToken={setToken} component={Login}/>
          </Route>
          <Route path="/signup" component={Signup} />
        </>
      }
    </div>
  )
}

export default Router;