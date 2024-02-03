// import '../App.css';
// import PostList from './PostList';
// import Communities from './Communities';
// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom'

// const CommunityPage = () => {
//   const url = 'http://localhost:3001';
//   const location = useLocation();
//   const navigate = useNavigate();
//   const postsPerPage = 5;
//   let params = new URLSearchParams(window.location.search);
//   const { community } = useParams();

//   const [posts, setPosts] = useState([]);
//   const [communityName, setCommunity] = useState(params.get('community'));
//   const [count, setCount] = useState(params.get('count'));

//   useEffect(() => {
//       getPosts();
//   }, [location, communityName, count]);

//   const nextPage = () => {
//     params.set('count', count + postsPerPage);
//     navigate(window.location.pathname + "?" + params.toString());
//     setCount(count + postsPerPage);
//   }

//   const getPosts = () => {
//     console.log(community);
//     let postCount = 0;
//     if (count) {
//       postCount = count;
//     }

//     let data = {}

//     // if community is selected, set body
//     if (communityName !== null) {
//       data = {"community": communityName}
//     }

//     // fetch based on community and count
//     fetch(
//       `${url}/posts/count/${postCount}`, 
//       {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       }
//     )
//     .then(res => res.json())
//     .then(data => {
//       setPosts(data);
//     });
//   }

//   return (
//     <div className="App">
//       <h1>Hello World</h1>
//       <PostList posts={posts}/>
//       <Communities setCommunity={setCommunity}/>
//       <button onClick={nextPage}>
//         next
//       </button>
//     </div>
//   );
// }

// export default CommunityPage;
