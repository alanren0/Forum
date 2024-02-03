import '../App.css';
import PostList from '../components/PostList';
import Communities from '../components/Communities';
import CreateCommunity from './CreateCommunity';
import CreatePost from './CreatePost';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const App = ({ communities, loggedIn, setLoggedIn, authToken, setAuthToken, user, setUser}) => {
  
  const apiUrl = 'http://localhost:3001';
  const location = useLocation();
  const navigate = useNavigate();
  const postsPerPage = 5;
  let params = new URLSearchParams(window.location.search);
  const { community } = useParams();
  const count = params.get('count');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      getPosts();
  }, [location, community, count]);

  const nextPage = () => {
    params.set('count', Number(count) + Number(postsPerPage));
    navigate(window.location.pathname + "?" + params.toString());
  }

  const prevPage = () => {
    params.set('count', (Number(count) - Number(postsPerPage)));
    navigate(window.location.pathname + "?" + params.toString());
  }


  const getPosts = () => {
    let postCount = 0;
    if (count) {
      postCount = count;
    }

    let data = {}

    // if community is selected, set body
    if (community !== null) {
      data = {"community": community}
    }

    // fetch based on community and count
    fetch(
      `${apiUrl}/posts/count/${postCount}`, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
    .then(res => res.json())
    .then(data => {
      setPosts(data);
    });
  }
  
  const createCommunityNav = () => {
    navigate('/createCommunity');
  }

  const createPostNav = () => {
    navigate('/createPost');
  }
  
  return (
    <div className="App">
      <Banner loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAuthToken={setAuthToken} username={user.username}/>
      <Header showDesc={true}/>
      <button onClick={createPostNav}>
        Create New Post!
      </button>
      
      <button onClick={createCommunityNav}>
        Create New Community!
      </button>
      <div className="homepage-separator">
        { posts.length >= 0 &&
          <PostList posts={posts} authToken={authToken} user={user} setUser={setUser}/>
        }
        <Communities communities={communities}/>
      </div>

      
      
      { count > 0 &&
        <button onClick={prevPage}>
          &#60; prev
        </button>
      }
      { posts.length >= postsPerPage && 
        <button onClick={nextPage}>
          next &#62;
        </button>
      }
    </div>
  );
}

export default App;
