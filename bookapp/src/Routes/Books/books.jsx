import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Books() {
  const burl = "http://localhost:8000/api/books";

  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(burl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        console.log("Ran api");
        setData(jsonData);
        setisLoading(false);
      } catch (error) {
        console.log(error);
        setisLoading(false);
        setError("Error in Fetching Data")
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1> BOOKS!!! </h1>
      <p> info about book pulled using API</p>

      <h2> Fetch Example</h2>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      
      {isLoading ? (<p> Loading...</p>) : error? (
        <p> {error} </p>
      ): (
        <ul className="books">
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`books/${item.slug}`}>
              <img
                src={`http://localhost:8000/uploads/${item.thumbnail}`}
                alt={item.title}
              ></img>

              <h3> {item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>

      )}
      
    </div>
  );
}

export default Books;
