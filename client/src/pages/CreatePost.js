import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ communities, authToken }) => {

    const apiUrl = 'http://localhost:3001';
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [body, setBody] = useState('');
    const [community, setCommunity] = useState("");

    // set initial community because have to wait for api to serve up the communities
    useEffect(() => {
        setCommunity(communities[0]?.name);
    }, [communities]);

    const inputTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const inputLinkHandler = (e) => {
        setLink(e.target.value);
    }

    const inputBodyHandler = (e) => {
        setBody(e.target.value);
    }

    const inputCommunityHandler = (e) => {
        setCommunity(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`${apiUrl}/posts/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(
                {
                    "title": title,
                    "link": link,
                    "body": body,
                    "community": community
                }
            )
        })
        .then(async res => {
            const data = await res.json();
            if (res.status === 200) {
                navigate(`/community/${data.community}/post/?id=${data._id}`);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <form>
            <h1>Create a Post!</h1>
            <div className="create-form">
                <div className="form-section">
                    <label>Post Title:</label><br></br>
                    <input className="create-short-input" value={title} onChange={inputTitleHandler} type='text'/>
                </div>
                <div className="form-section">
                    <label>Link:</label><br></br>
                    <input className="create-short-input" value={link} onChange={inputLinkHandler} type='text'/>
                </div>
                <div className="form-section">
                    <label> Body:</label><br></br>
                    <textarea className="description-input-box" value={body} onChange={inputBodyHandler} type='text'/>
                </div>
                <div className="form-section">
                    <label>Community: </label>
                    <select onChange={inputCommunityHandler}>
                        {communities.map(community => (
                            <option key={community.name} value={community.nme}>{community.name}</option>    
                        ))}
                    </select>
                </div>
                <div className="form-section">
                    <button onClick={submitHandler} type="submit">
                        Create
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;
