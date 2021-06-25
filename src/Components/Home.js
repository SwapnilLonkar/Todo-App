import axios from 'axios';
import { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";


  
  function App() {

    const [loginError, setLoginError] = useState(false)
    const [values, setValues] = useState({
      email: "",
      password: ""
    })
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [isEmpty, setisEmpty] = useState(true)
    let history = useHistory();

    const handleEmail = (e) =>
    {
      setValues({...values,email: e.target.value })
      validateEmail();

    }

    const handlePassword = (e) =>
    {
      setValues({...values,password: e.target.value })
      validatePassword();

    }
    const validateEmail = () => {
          if (!values.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2}$/)) {
              setInvalidEmail(true)
          } else {
              setInvalidEmail(false)
              setisEmpty(false)
          }
        }

        const validatePassword = () => {
          if (values.password.length < 4 || values.password.length > 16 ) {
              setInvalidPassword(true)
          }else 
          {
            setInvalidPassword(false)
            setisEmpty(false)
          }
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
              history.push("/list");
          }
        }).catch((err) =>{alert("Unable to Login, Please try again")})

      }


    return (
      
      <div className="Container">
        <div className="form">
        <form onSubmit={onSubmit} >
          <h1>Rapptr Labs</h1>
          <div className="inputblock">
            <div className="label">
          <label htmlFor="Email">Email</label>
          </div>
          <div className="iconContainer">
          <i className="icon" ><FaUser/></i>
          <input className="input" value={values.email} onChange={handleEmail} type="email" id="Email" placeholder="user@rapptrlabs.com "></input>
          </div>
          </div>
          {invalidEmail? <text className="invalidText">email is invalid</text> :null}
          <div className="inputblock">
            <div className="label">
          <label htmlFor="Password">Password</label>
          </div>
          <div className="iconContainer">
          <i className="icon"><FaLock/></i>
          <input className="input" value={values.password} onChange={handlePassword} type="password" id="Password" placeholder="Must be at least 4 characters"></input>
          </div>
          </div>
          {invalidPassword? <text className="invalidText">Password is Invalid</text> :null}
          <div>
          { invalidEmail ||invalidPassword || isEmpty ? <button disabled className="button">Submit</button> :<button className="button" >Submit</button>}
          </div>
        </form>
        </div>
        
      </div>
      
      
      
    );
  }
  
  export default App;