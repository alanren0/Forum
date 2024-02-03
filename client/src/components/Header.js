import { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams } from 'react-router-dom'


const Header = ( {authToken} ) => {

    const apiUrl = 'http://localhost:3001';
    const { community } = useParams();
    const [communityInfo, setCommunityInfo] = useState({});

    useEffect(() => {
        getCommunity();
    }, [community]);

    const getCommunity = () => {
        fetch(`${apiUrl}/communities/get/${community}`)
        .then(res => res.json())
        .then(data => {
            setCommunityInfo(data);
        });
    }

    return (
        <div className="header-container">
            <div className="header">
                <h1>
                    <Link to={"/"} state={{ authToken: authToken }}>
                        Forum
                    </Link>
                { community != null &&
                    <>
                        &nbsp; &gt;
                        <Link style={{"fontSize": "24px"}} to={`/community/${community}`} state={{ authToken: authToken }}>
                            &nbsp; {community}
                        </Link>
                        
                        {communityInfo &&
                            <p style={{"fontSize": "14px"}}>{communityInfo.desc}</p>
                        }
                    </>
                }
                </h1>
            </div>
            
        </div>
    );
}

export default Header;