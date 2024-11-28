import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Books() {
  const burl = "http://localhost:8000/api/books";

  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelected] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let url = burl;
      try {
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const response = await fetch(url);

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
        setError("Error in Fetching Data");
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1> Book Catalogue </h1>
      <p> info about book pulled using API</p>
      <div className="link">
        <Link to={"/createBooks"}>Create Book ✍🏻 </Link>
      </div>
     
      <div className="filters">
        <label>Categories</label>
        <select onChange={(e) => setSelected(e.target.value)}>
          <option value=""> All</option>
          <option value="romance"> Romance</option>
          <option value="science"> Science</option>
          <option value="crime"> Crime</option>
          <option value="food"> Food</option>
          <option value="adventure"> Adventure</option>
          <option value="thriller"> Thriller</option>
          <option value="fiction"> Fiction</option>
          <option value="other"> Other</option>
        </select>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      {isLoading ? (
        <p> Loading...</p>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
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
