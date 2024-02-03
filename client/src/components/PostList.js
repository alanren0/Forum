import Post from './Post';

const PostList = ({ posts, authToken, user }) => {
    return (
        <div className="post-space">
            <ul>
                {posts.map(post => (
                    <Post key={post._id} post={post} authToken={authToken} user={user}/>
                ))}
            </ul>
        </div>
    );
}

export default PostList;