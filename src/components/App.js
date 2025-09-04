import React, { useEffect, useMemo, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Memoize posts so they don’t recalc unnecessarily
  const memoizedPosts = useMemo(() => data, [data]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "disc" }}>
          {memoizedPosts.map((post) => (
            <li key={post.id} style={{ marginBottom: "20px" }}>
              <strong>{post.title}</strong>
              <p style={{ margin: "5px 0 0 0" }}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

