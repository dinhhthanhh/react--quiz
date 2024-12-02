import "./error.scss";

function Error() {
    return (
        <div className="error-page">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="home-link">Go back to Home</a>
        </div>
    );
}

export default Error;