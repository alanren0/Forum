import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = ({ authToken, getCommunities }) => {

    const navigate = useNavigate();
    const apiUrl = 'http://localhost:3001';

    const [communityName, setCommunityName] = useState('');
    const [description, setDescription] = useState('');

    const inputCommunityHandler = (e) => {
        setCommunityName(e.target.value);
    }

    const inputDescriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`${apiUrl}/communities/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(
                {
                    "name": communityName,
                    "desc": description
                }
            )
        })
        .then(async res => {
            const data = await res.json();
            if (res.status === 200) {
                navigate(`/community/${communityName}`);
                alert("New community created!");
                getCommunities();
            } else {
                alert("Failed to create community")
            }
        });
    }

    return (
        <form>
            <h1>Create a Community!</h1>
            <div className="create-form">
                <div className="form-section">
                    <label>Community Name:</label><br></br>
                    <input className="create-short-input" value={communityName} onChange={inputCommunityHandler} type='text'/>
                </div>
                <div className="form-section">
                    <label>Description:</label><br></br>
                    <textarea className="description-input-box" value={description} onChange={inputDescriptionHandler} type='text'/>
                </div>
                <div className="form-section">
                    <button onClick={submitHandler} type="submit">Create</button>
                </div>
            </div>
        </form>
    );
}

export default CreateCommunity;
