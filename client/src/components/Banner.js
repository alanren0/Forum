import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";

const Banner = ({ loggedIn, setLoggedIn, setAuthToken, username }) => {

    const navigate = useNavigate();

    const navSignUp = () => {
        navigate('/signup');
    }

    const navLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            {!loggedIn &&
            <>
                <button onClick={navSignUp}>
                    Sign Up
                </button>
                <button onClick={navLogin}>
                    Log In
                </button>
            </>
            } 
            {loggedIn &&
                <>
                    <p>Logged in as {username}</p>
                    <LogoutBtn setLoggedIn={setLoggedIn} setAuthToken={setAuthToken}/>
                </>
            }
        </div>
    );
}

export default Banner;