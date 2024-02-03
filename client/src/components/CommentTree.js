import Comment from './Comment';

const CommentTree = ({ comments, authToken, user, getComments }) => {

    return (
        <div>
            <ul>
                {comments && comments.map((c) => (
                    <div key={c.contents._id}>
                        <Comment comment={c.contents} authToken={authToken} user={user} getComments={getComments}/>
                        <CommentTree comments={c.children} authToken={authToken} user={user} getComments={getComments}/>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default CommentTree;
