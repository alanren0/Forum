import { Link } from "react-router-dom";

const Communities = ({ communities }) => {

    return (
        <div className="communities-box">
            <ul>
                <h3>Communities</h3>
                {communities != null &&
                communities.map(community => (
                    <Link key={community.name} to={`/community/${community.name}`}>
                        <p>
                            {community.name}
                        </p>
                    </Link>    
                ))}
            </ul>
        </div>
    )
}

export default Communities;