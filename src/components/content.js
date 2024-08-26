function Content() {

    return (
        <div className="container">
            
            {/* Header section of the component */}
            <header className="header">
                <h1>Album Explorer</h1>
            </header>

            {/* Main content area */}
            <main className="main-content">
                <section className="intro-section">
                    <h2>Album Recomendations</h2>
                    <h4>It is {new Date().toLocaleTimeString()}.</h4>
                    <p>
                        Dive into a vast sea of music with Album Explorer! Here, you can share your favorite albums and explore suggestions from other music enthusiasts. Discover new tunes, find hidden gems, and expand your musical horizon.
                    </p>
                </section>

                {/* Features section */}
                <section className="features-section">
                    <h2>Features</h2>
                    <ul>
                        <li>Upload your own album recommendations</li>
                        <li>Read reviews from other users</li>
                        <li>Discover top-rated albums</li>
                        <li>Explore genres and new releases</li>
                    </ul>
                </section>
            </main>

            {/* Footer of the component */}
            <footer className="footer">
                <p>&copy; 2024 Album Explorer. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
export default Content;