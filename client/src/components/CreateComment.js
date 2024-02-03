import { useState } from 'react';
import "../App.css";

const Reply = ({ comment, postId, setShowReply, authToken, getComments}) => {
    const apiUrl = 'http://localhost:3001';

    const [commentBody, setCommentBody] = useState();

    const inputBodyHandler = (e) => {
        setCommentBody(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let data = {
            "user": "test_user_1",
            "body": commentBody,
            "postId": postId,
            "rootCommentId": "",
            "parentCommentId": ""
        }

        if (comment != null) {
            data["rootCommentId"] = comment._id;
            data["parentCommentId"] = comment._id;
        }
        
        fetch(`${apiUrl}/comments/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status === 200) {
                setShowReply(false);
                setCommentBody("");
                getComments();
            }
        });
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        setShowReply(false);
        setCommentBody("");
    }

    return (
        <form className="comment-form">
            <textarea className="comment-text" value={commentBody} onChange={inputBodyHandler} type='text'/>
            <button onClick={submitHandler} type="submit">
                Submit Comment
            </button>
            <button onClick={cancelHandler} type="submit">
                Cancel
            </button>
        </form>
    );
}

export default Reply;