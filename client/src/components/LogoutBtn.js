
const LogoutBtn = ({ setLoggedIn, setAuthToken }) => {

    const logoutHandler = () => {
        setLoggedIn(false);
        setAuthToken("");
    }

    return (
        <button onClick={logoutHandler}>
            Log out
        </button>
    );
}

export default LogoutBtn;