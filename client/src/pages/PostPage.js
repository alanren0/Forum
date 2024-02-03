import React, {useState, useEffect} from 'react';
import CommentTree from '../components/CommentTree';
import CreateComment from '../components/CreateComment';
import Header from '../components/Header';
import ExpandedPost from '../components/ExpandedPost';
import Banner from '../components/Banner';
import { useLocation } from 'react-router-dom'

const PostPage = ({ loggedIn, setLoggedIn, setAuthToken, user, setUser, authToken }) => {
    const apiUrl = 'http://localhost:3001';
    const location = useLocation();
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const [showReply, setShowReply] = useState(false);
    const [tree, setTree] = useState();

    const showReplyHandler = () => {
        setShowReply(!showReply)
    }
    
    useEffect(() => {
        getPost();
        getComments();
    }, [location]);

    useEffect(() => {
        setTree(getCommentTree(""));
    }, [comments])


    // get the particular post information
    const getPost = () => {
        fetch(apiUrl + '/posts/' + postId)
        .then(res => res.json())
        .then(data => {
    
          setPost(data);
        });
    }

    // get all the comments on the post
    const getComments = () => {
        fetch(apiUrl + '/comments/onPost/' + postId)
        .then(res => res.json())
        .then(data => {
            setComments(data);
        });
    }

    // turn the comments into a tree structure
    const getCommentTree = (parentId) => {
        
        // base case
        if (parentId === null) {
            return;
        }
        
        // filter comments to get children of parent comment
        const children = comments.filter(comment => 
            comment.parentCommentId === parentId
        );

        // tree of comments to return
        const tree = [];

        children.forEach(child => {
            tree.push({
                'contents': child,
                'children': getCommentTree(child._id)
            });
        });

        return tree;
    }
    
    return (
        <div>
            <Banner loggedIn={loggedIn} setLoggedIn={setLoggedIn} setAuthToken={setAuthToken} username={user.username}/>
            <Header showDesc={false}/>
            <ExpandedPost post={post} authToken={authToken} user={user} setUser={setUser}/>
            <button onClick={showReplyHandler}>
                Reply
            </button>
            {showReply &&
                <CreateComment postId={post._id} setShowReply={setShowReply} authToken={authToken} user={user} getComments={getComments}/>
            }
            <CommentTree comments={tree} authToken={authToken} user={user} setUser={setUser} getComments={getComments}/>
        </div>
    );
}
export default PostPage;
