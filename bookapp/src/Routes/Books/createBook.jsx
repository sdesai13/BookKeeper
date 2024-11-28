import { React, useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [submitted, setSubmitted] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(NoImageSelected);

  const createbook = async (e) => {
    e.preventDefault();
    console.table([title, slug]);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("thumbnail", thumbnail);
    formData.append("category", categories);
    formData.append("stars", stars);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",

        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setThumbnail(null);
        setSubmitted(true);
        setDescription("");
        setCategories([]);
        setImage(NoImageSelected);
        setStars(0);
      } else {
        console.log("cant submit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  return (
    <div>
      <h1>Create Book</h1>

      <form className="bookdetails">
        <div className="col-1">
          <label> Upload Thumbnail</label>
          <img src={image} alt="preview image" />
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            className="custom-file-upload "
            onChange={onImageChange}
          />
        </div>

        <div className="col-2">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Stars</label>
            <input
              type="number"
              value={stars}
              min={0} // Minimum value
              max={5} // Maximum value
              onChange={(e) => setStars(e.target.value)}
            ></input>
          </div>

          <div>
            <label>Description</label>
            <textarea
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Categories (Seperate with Commas)</label>
            <input
              type="test"
              value={categories}
              onChange={handleCategoryChange}
            />
          </div>
          <button onClick={createbook}> Create Book</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBook;
