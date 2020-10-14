import React, { useState, useEffect } from 'react';


class FlaskRequests {
  constructor(user_token) {
    this.endpoint = "http://localhost:5000/api/";
    this.token = user_token; // could do this to automate auth for those requests
  }
  getPositions(...dataWeNeed) {
    // fetch logic here
    // return our positions (an Array)
  }
}

export const postRequest = async (endpoint, data) => {
  const params = {
    method: "POST",
    mode: "cors",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  const response = await fetch(`http://localhost:5000/api/${endpoint}`, params);
  return response.json();
}

export const getRequest = async (endpoint) => {
  const response = await fetch(`http://localhost:5000/api/${endpoint}`);
  return response.json()
}

export const useStateWithSessionStorage = (key, initial) => {
  const [value, setValue] = useState(sessionStorage.getItem(key || initial));

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [value])

  return [value, setValue];
}
