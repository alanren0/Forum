import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthToken, setLoggedIn, setUser }) => {

    const apiUrl = 'http://localhost:3001';
    
    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState("");
    const [password, setPassword] = useState('');

    const inputUsernameHandler = (e) => {
        setUsernameInput(e.target.value)
    }

    const inputPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "username": usernameInput,
                    "password": password
                }
            )
        })
        .then(async res => {
            const data = await res.json();
            if (res.status === 200) {
                setAuthToken(data.accessToken);
                setUser(data.user);
                setLoggedIn(true);
                navigate('/');
            } else {
                alert("could not login");
            }
        });
    }

    return (
        <form>
            <h1>Login</h1>
            <div className="signup-form">
                <div className="form-section">
                    <label>Username:</label><br></br>
                    <input value={usernameInput} onChange={inputUsernameHandler} type='text'/>
                </div>
                <div className="form-section">
                    <label>Password:</label><br></br>
                    <input value={password} onChange={inputPasswordHandler} type='password'/>
                </div>
                <div className="form-section">
                    <button onClick={submitHandler} type="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;
