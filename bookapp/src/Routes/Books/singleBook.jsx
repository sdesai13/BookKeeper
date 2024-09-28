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

  return <div>
    

  </div>;
}

export default SingleBook;
