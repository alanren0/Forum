import './App.css';
import PostList from './components/PostList';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import CreateCommunity from './pages/CreateCommunity';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login'
import Signup from './pages/Signup'

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const apiUrl = 'http://localhost:3001';

  const [communities, setCommunities] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    getCommunities();
  }, []);

  const getCommunities = (req, res) => {
    fetch(`${apiUrl}/communities/all`)
    .then(res => res.json())
    .then(data => {
        setCommunities(data);
    })
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' 
            element={<HomePage 
              communities={communities} 
              loggedIn={loggedIn} 
              setLoggedIn={setLoggedIn} 
              authToken={authToken}
              setAuthToken={setAuthToken} 
              user={user}
              setUser={setUser}
            />}
          />
          
          <Route path='/community/:community/post' 
            element={<PostPage 
              setAuthToken={setAuthToken}
              authToken={authToken} 
              user={user} 
              loggedIn={loggedIn} 
              setLoggedIn={setLoggedIn}
              setUser={setUser}
            />}
          />

          <Route path='/community/:community' 
            element={<HomePage 
              communities={communities} 
              loggedIn={loggedIn} 
              setLoggedIn={setLoggedIn} 
              authToken={authToken}
              setAuthToken={setAuthToken} 
              user={user}
              setUser={setUser}
            />}
          />
          <Route path='/createCommunity' element={<CreateCommunity authToken={authToken} getCommunities={getCommunities}/>}/>
          <Route path='/createPost' element={<CreatePost communities={communities} authToken={authToken}/>}/>
          <Route path='/login' element={<Login setAuthToken={setAuthToken} setLoggedIn={setLoggedIn} setUser={setUser}/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


      