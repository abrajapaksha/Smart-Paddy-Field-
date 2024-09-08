import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const [apiKey, setApiKey] = useState("");
    const [channelId, setChannelId] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.get(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=2`)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('apiKey', apiKey);
                    localStorage.setItem('channelId', channelId);
                    localStorage.setItem('logStatus', true);
                    navigate('/', { state: {} });
                } else {
                    setError("Something went wrong");
                    setApiKey("");
                    setChannelId("");
                }
            })
            .catch(err => {
                setError("Invalid API Key or Channel ID");
                setApiKey("");
                setChannelId("");
            });
    }

    return (
        <>
            <div className="center">
                <div className="log-container">
                    <div className="text">LogIn</div>
                    <div className="log-form">
                        <div className="data">
                            <label>Enter your Channel ID
                                <label style={{ color: 'red' }}>
                                    &nbsp;{error ? `(${error})` : ""}
                                </label>
                            </label>
                            <input
                                value={channelId}
                                onChange={(e) => { setChannelId(e.target.value); setError(null) }}
                                type="text" 
                                required 
                            />
                        </div>
                        <div className="data">
                            <label>Enter your API key
                                <label style={{ color: 'red' }}>
                                    &nbsp;{error ? `(${error})` : ""}
                                </label>
                            </label>
                            <input
                                value={apiKey}
                                onChange={(e) => { setApiKey(e.target.value); setError(null) }}
                                type="text" 
                                required 
                            />
                        </div>
                        <div className="btn">
                            <div className="inner"></div>
                            <button onClick={handleSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
