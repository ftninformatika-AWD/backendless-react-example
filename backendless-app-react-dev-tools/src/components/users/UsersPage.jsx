import React from "react"
import { useEffect, useState } from "react"
import { fetchUsers } from "../../services/users"
import ErrorDisplay from "../ErrorDisplay"
import UserCard from "./UserCard"
import './styles/UserPage.scss'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true); 
            setError(null);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false); // Bez obzira na uspeh ili grešku, loading se postavlja na false
            }
        };

        loadUsers();
    }, []);

    return (
        <div className="user-page-container">
            <h1>Users</h1>

            {isLoading && (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading users...</p>
                </div>
            )}

            {error && (
                <ErrorDisplay message={error} /> // Prikazujemo komponentu za grešku
            )}

            {!isLoading && !error && users.length === 0 && (
                <p className="no-users-message">No users found.</p>
            )}

            {!isLoading && !error && users.length > 0 && (
                <div className="user-list-wrapper">
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default UsersPage