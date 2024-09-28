import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleBook() {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);

  const urlParams = useParams();
  const burl = `http://localhost:8000/api/books/${urlParams.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      let url = burl;
      try {
        const response = await fetch(burl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        console.log("Ran api");
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function Stars({ numstars }) {
    const stars = [];
    for (let i = 0; i < numstars; ++i) {
      stars.push(<span key={i}> ⭐ </span>);
    }
    return <div> Rating: {stars} </div>;
  }

  return (
    <div>
      <div className="link">
        <Link to={"/books"}> All Books 📔🔙 </Link>{" "}
      </div>

      {data.map((item) => (
        <div className="bookdetails" key={item._id}>
          <div className="col-1">
            <img
              src={`http://localhost:8000/uploads/${item.thumbnail}`}
              alt={item.title}
            ></img>

            <div className="link">
              <Link to={`/editbook/${item.slug}`}>Edit ✏️ </Link>{" "}
            </div>
          </div>
          <div className="col-2">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <Stars numstars={item.stars}></Stars>
            <p>Category</p>
            <ul>
              {item.category.map((item, index) => (
                <li key={index}> {item} </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SingleBook;
