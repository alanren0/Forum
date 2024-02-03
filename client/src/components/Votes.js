import { useState, useEffect } from "react";

const Votes = ({ post, authToken, user, setUser, postOrComment }) => {

    const apiUrl = 'http://localhost:3001';

    const [votes, setVotes] = useState(0);
    const [userVotes, setUserVotes] = useState(0);

    useEffect(() => {
        if (post.upvotes != null && post.downvotes != null) {
            setVotes(post.upvotes - post.downvotes);
        }
    }, [post]);
    

    useEffect(() => {
        if (user.postVotes != null && user.postVotes[post._id]) {
            setUserVotes((user.postVotes[post._id]) || 0);
        }
        else if (user.commentVotes != null && user.commentVotes[post._id]) {
            setUserVotes((user.commentVotes[post._id]) || 0);
        }
        
    }, [user, post, user?.postVotes, user?.commentVotes]);

    const upvote = () => {
        fetch(`${apiUrl}/${postOrComment}/upvote/${post._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setVotes(data.updatedPost.upvotes - data.updatedPost.downvotes);
            setUser(data.updatedUser);
            if (postOrComment === "comments") {
                setUserVotes(data.updatedUser.commentVotes[post._id]);
            } else {
                setUserVotes(data.updatedUser.postVotes[post._id]);
            }
            
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    const downvote = () => {
        fetch(`${apiUrl}/${postOrComment}/downvote/${post._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setVotes(data.updatedPost.upvotes - data.updatedPost.downvotes);
            setUser(data.updatedUser);
            if (postOrComment === "comments") {
                setUserVotes(data.updatedUser.commentVotes[post._id]);
            } else {
                setUserVotes(data.updatedUser.postVotes[post._id]);
            }
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <div className='votes'>
                {userVotes >= 1 &&
                    <button style={{"backgroundColor": "orange"}} onClick={upvote} className="fas fa-arrow-up"></button>
                }
                {userVotes < 1 &&
                    <button style={{"backgroundColor": "grey"}} onClick={upvote} className="fas fa-arrow-up"></button>
                }
                <p>{votes}</p>
                {userVotes <= -1 &&
                    <button style={{"backgroundColor": "blue"}} onClick={downvote} className="fas fa-arrow-down"></button>
                }
                {userVotes > -1 &&
                    <button style={{"backgroundColor": "grey"}} onClick={downvote} className="fas fa-arrow-down"></button>
                }
            </div> 
        </>
    );
}

export default Votes;