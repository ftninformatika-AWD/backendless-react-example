import React, { useState } from 'react';
import './styles/PostItem.scss';
import ErrorDisplay from '../ErrorDisplay';
import { fetchCommentsForPost } from '../../services/posts';

const PostItem = ({ post }) => {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleViewCommentsClick = async () => {
        // Prebacujemo stanje prikaza/skrivanja komentara
        setShowComments(prev => !prev);

        // Ako komentari treba da se prikažu I još nisu učitani (ili se desila greška), dohvati ih
        if (!showComments && comments.length === 0 && !error) {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchCommentsForPost(post.id);
                setComments(data);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="post-item-container">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>

            <button className="view-comments-btn" onClick={handleViewCommentsClick}>
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>

            {showComments && (
                <div className="comments-section">
                    {isLoading && (
                        <div className="loading-comments-state">
                            <div className="loading-spinner-small"></div>
                            <p>Loading comments...</p>
                        </div>
                    )}

                    {error && (
                        <ErrorDisplay message={error} />
                    )}

                    {!isLoading && !error && comments.length === 0 && (
                        <p className="no-comments-message">No comments for this post.</p>
                    )}

                    {!isLoading && !error && comments.length > 0 && (
                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment.id} className="comment-item">
                                    <p className="comment-author"><strong>{comment.name}</strong> ({comment.email})</p>
                                    <p className="comment-body">{comment.body}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostItem;