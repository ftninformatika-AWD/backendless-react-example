import React from 'react';
import './styles/UserCard.scss'; 
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
    
    const navigate = useNavigate()

    const handleViewPostsClick = () => {
        navigate(`/posts/user/${user.id}`);
    };


    return (
        <div className="user-card-container">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-detail">Email: {user.email}</p>
            <p className="user-detail">Phone: {user.phone}</p>
            <button className="view-posts-btn" onClick={handleViewPostsClick}>
                View Posts
            </button>
        </div>
    );
};

export default UserCard;