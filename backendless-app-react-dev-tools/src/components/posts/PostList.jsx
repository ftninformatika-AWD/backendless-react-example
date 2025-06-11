import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/PostList.scss';
import { fetchPosts } from '../../services/posts';
import ErrorDisplay from '../ErrorDisplay';
import { fetchUser } from '../../services/users';
import PostItem from './Postitem';

const PostList = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            setError(null);

            let apiUrl = '/posts'; // Podrazumevana URL za sve postove
            let titlePrefix = "All Posts";

            if (userId) {
                try {
                    const userResponse = await fetchUser(userId);
                    setUser(userResponse);
                    titlePrefix = `${user.name}'s Posts`;
                } catch (err) {
                    console.error(err.message);
                    setError(`Error: ${err.message || 'User not found.'}`);
                    setIsLoading(false);
                    return
                }
                apiUrl = `/users/${userId}/posts`; // URL za postove određenog korisnika
            } else {
                setUser(null); // Resetuj korisnika ako prikazujemo sve postove
            }

            try {
                const data = await fetchPosts(apiUrl);
                setPosts(data);
                setFilteredPosts(data);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, [userId]); // useEffect će se ponovo pokrenuti ako se userId promeni

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(lowercasedSearchTerm) ||
            post.body.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredPosts(filtered);
    }, [searchTerm, posts]); // Pokreće se kada se searchTerm ili posts promene

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="post-list-page-container">
            {/* Prikaži "Back to Users" link samo ako je na ruti za korisničke postove */}
            {userId && (
                <Link to="/users" className="back-to-users-link">
                    &larr; Back to Users
                </Link>
            )}
            <h1>{user ? `${user.name}'s Posts` : "All Posts"}</h1>

            {!isLoading && !error && (
                <div className="post-search-bar">
                    <input
                        type="text"
                        placeholder="Search posts by title or body..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="post-search-input"
                    />
                </div>
            )}

            {isLoading && (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading posts...</p>
                </div>
            )}

            {error && (
                <ErrorDisplay message={error} />
            )}

            {!isLoading && !error && filteredPosts.length === 0 && (
                <p className="no-posts-message">
                    {searchTerm ? `No posts found matching "${searchTerm}".` : "No posts found for this user."}
                </p>
            )}

            {!isLoading && !error && filteredPosts.length > 0 && (
                <div className="post-list-wrapper">
                    {filteredPosts.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;