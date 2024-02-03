import Post from './Post';

const PostList = ({ posts, authToken, user, setUser }) => {
    return (
        <div className="post-space">
            <ul>
                {posts.map(post => (
                    <Post key={post._id} post={post} authToken={authToken} user={user} setUser={setUser}/>
                ))}
            </ul>
        </div>
    );
}

export default PostList;