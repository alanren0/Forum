import Votes from './Votes';
import { Link } from "react-router-dom"

const ExpandedPost = ({ post, authToken, user, setUser }) => {
    const [unit, time] = timeAgo(Date.parse(post.date));
    
    const apiUrl = 'http://localhost:3001';

    const upvote = () => {

    }

    const downvote = () => {
        
    }

    return (
        <div className='card'>
            <Votes post={post} authToken={authToken} user={user} setUser={setUser} postOrComment="posts"/>
            
            <div className="card-body">
                <p>
                    <Link className="post-title" to={post.link}>
                        {post.title}
                    </Link>
                </p>
                <p>
                    {post.body}
                </p>
                <p className="post-info">
                    Submitted {time} {unit} ago by {post.user} to <Link to={`/community/${post.community}`}>{post.community}</Link>
                </p>
                
            </div>
            

        </div>
    );
}

const timeAgo = (d) => {

    const mils = Date.now() - d;
    const seconds = mils / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = days / 365;

    const units = {
        'year': years,
        'month': months,
        'day': days,
        'hour': hours,
        'minute': minutes,
        'second': seconds
    }

    for (const [k, v] of Object.entries(units)) {
        if (v >= 2) {
            return [k + 's', Math.floor(v)];
        }
        if (v >= 1) {
            return [k, Math.floor(v)];
        }
    }
    return ['second', '< 1']
}

export default ExpandedPost;