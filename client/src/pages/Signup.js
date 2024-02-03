import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const apiUrl = 'http://localhost:3001';
    
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const inputUsernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const inputPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(
                {
                    "username": username,
                    "password": password
                }
            )
        })
        .then(async res => {
            const data = await res.json();
            if (res.status === 200) {
                navigate('/login');
                alert("signup successful");
            } else {
                alert("could not login");
            }
        });
    }

    return (
        <form>
            <h1>Sign up</h1>
            <div className="signup-form">
                <div className="form-section">
                    <label>Username:</label><br></br>
                    <input value={username} onChange={inputUsernameHandler} type='text'/>
                </div>
                <div className="form-section">
                    <label>Password:</label><br></br>
                    <input value={password} onChange={inputPasswordHandler} type='password'/>
                </div>
                <div className="form-section">
                    <button onClick={submitHandler} type="submit">
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Signup;