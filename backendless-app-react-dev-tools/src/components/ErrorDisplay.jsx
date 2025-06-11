import React from 'react';
import './styles/ErrorDisplay.scss'; 

const ErrorDisplay = ({ message }) => {
    return (
        <div className="error-display-container">
            <p className="error-message">
                <strong>Error:</strong> {message || 'An error occurred.'}
            </p>
            <p className="error-tip">Please try again later.</p>
        </div>
    );
};

export default ErrorDisplay;