import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function App() {

  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState("")
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  function handleEmail(event) {
    setUserEmail(event.target.value)
  }

  function handlePass(event) {
    setPassword(event.target.value)
  }

  function handleLogin() {
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userEmail === "") {
      setEmailError("Email required")
      hasError = true

    }
    else if(!emailRegex.test(userEmail)){
      setEmailError("Invalid Email format")
      hasError = true
    }
    else {
      setEmailError("")
    }
    if (password === '') {
      setPassError("Password is required")
      hasError = true;

    }
    else if(password.length<6) {
      setPassError("password must be at least 6 characters")
      hasError = true;
    }
    else{
      setPassError("")  
    }

    if (hasError) {
      return
    }

    const loginDetails = axios.post(`https://login-page-react-express.onrender.com/login`, { "email": userEmail, "password": password })
    loginDetails.then(function (data) {
      console.log(data)

      if (data.data.success === true) {
        navigate("/success")
        setEmailError("");
        setPassError("");
        setLoginError("");
      }
      else if (data.data.success === false)
      {
        setLoginError(data.data.message)
      }

    })





  }
  return (
    <div className='container'>
      <h1 className='login-title'>login page</h1>
      <div className='login-card'>
        <input type="text" placeholder='Email' name='email' onChange={handleEmail} />
        <p>{emailError}</p>
        <input type="password" placeholder='password' name='password' onChange={handlePass} />
        <p>{passError}</p>
        <p className='login-failed'>{loginError}</p>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default App
