import { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams } from 'react-router-dom'


const Header = ( {showDesc} ) => {

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
                    <Link to={"/"}>
                        Forum
                    </Link>
                { community != null &&
                    <>
                        &nbsp; &gt;
                        <Link style={{"fontSize": "24px"}} to={`/community/${community}`}>
                            &nbsp; {community}
                        </Link>
                        
                        {communityInfo && showDesc &&
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