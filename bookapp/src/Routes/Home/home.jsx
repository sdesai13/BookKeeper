import React from "react";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {/* Hero Section */}
      
        <h1>Welcome to Librarian</h1>
        <p style={{ fontSize: "1.2rem", color: "#007d93" }}>
          Your personal book management system. Add, organize, and explore your library effortlessly.
        </p>
       
      

      {/* Features Section */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Features</h2>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
          <li>📚 Add books to your personal collection.</li>
          <li>🔍 Search and filter your library effortlessly.</li>
          <li>✏️ Update book details with ease.</li>
          <li>🗑️ Delete books you no longer need.</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;