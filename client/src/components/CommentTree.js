import Comment from './Comment';

const CommentTree = ({ comments, authToken, user, setUser, getComments }) => {

    return (
        <div>
            <ul>
                {comments && comments.map((c) => (
                    <div key={c.contents._id}>
                        <Comment comment={c.contents} authToken={authToken} user={user} setUser={setUser} getComments={getComments}/>
                        <CommentTree comments={c.children} authToken={authToken} user={user} setUser={setUser} getComments={getComments}/>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default CommentTree;
