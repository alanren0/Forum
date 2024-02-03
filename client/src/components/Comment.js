import { useState } from 'react';
import CreateComment from "./CreateComment";
import Votes from './Votes';

import '../App.css';

const Comment = ({ comment, authToken, user, getComments }) => {

    const [showReply, setShowReply] = useState(false);

    const showReplyHandler = () => {
        setShowReply(!showReply)
    }

    return (
        <div>
            <div className='card'>
                <Votes post={comment} authToken={authToken} user={user} postOrComment="comments"/>
                <div style={{"width": "100%", "paddingRight": "40px", "boxSizing": "border-box"}}>
                    <p>{comment.user}</p>
                    <p style={{"height": "100%", "overflowWrap": "break-word"}}>{comment.body}</p>
                    <button className="reply-button" onClick={showReplyHandler}>
                        Reply
                    </button>
                </div>
                
            </div>
            {showReply &&
            <div className="reply-drop">
                <p style={{"margin": "4px"}}>Replying to: {comment.user}</p>
                <CreateComment comment={comment} postId={comment.postId} setShowReply={setShowReply} authToken={authToken} getComments={getComments}/>
            </div>
            }
        </div>
    );
}

export default Comment;