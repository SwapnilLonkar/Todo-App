import './App.css';
  import React from 'react';
import axios from 'axios';
import { useState } from 'react';

  
  function App() {


    const [userData, setuserData] =  useState({})
    const [isloggedIn, setisloggedIn] = useState(false)
    const [loginError, setLoginError] = useState(false)
    

    const [values, setValues] = useState({
      email: "",
      password: ""
    })

    const handleEmail = (e) =>
    {
      setValues({...values,email: e.target.value })

    }

    const handlePassword = (e) =>
    {
      setValues({...values,password: e.target.value })

    }

      const onSubmit= (event) => 
      {
        event.preventDefault();
        let formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)
        
      
         axios({
          method: 'post',
          url: 'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
          headers: {
            'Content-type': 'multipart/form-data'
          },
          data: formData,
        })
        .then(response => {
            if (response.data) {
              setuserData(response.data);
              logUserIn();
            }})
        

      }

      const logUserIn = () => {
        setTimeout(() => {
          setisloggedIn(true)
          if (loginError) setLoginError(false)
        }, 450)
        console.log(userData);
      }


    return (
      
      <div className="Container">
        <div className="form">
        <form onSubmit={onSubmit}>
          <h1>Rapptr Labs</h1>
          <div className="inputblock">
            <div className="label">
          <label htmlFor="Email">Email</label>
          </div>
          <input className="input" value={values.email} onChange={handleEmail} type="text" id="Email" placeholder="user@rapptrlabs.com "></input>
          </div>
          <div className="inputblock">
            <div className="label">
          <label htmlFor="Password">Password</label>
          </div>
          <input className="input" value={values.password} onChange={handlePassword} type="text" id="Password" placeholder="Must be at least 4 characters"></input>
          </div>
          <div>
          <button className="button">Submit</button>
          </div>
        </form>
        </div>
        
      </div>
      
      
      
    );
  }
  
  export default App;