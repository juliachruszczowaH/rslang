import React from 'react';
import { useParams } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
    const { groupId,pageId } = useParams();
    return (
        <div className="home-container">
            <div className="home-content">
                <h3>Home</h3>
                <span>{`group: ${groupId}; page: ${pageId}`}</span>
            </div>
        </div>
    );
};

export default Home;