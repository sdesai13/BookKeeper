require("dotenv").config();

const dbConnect = require("./connectDB");

const cors = require("cors");

const express = require("express");

const Book = require("./models/Book");

const app = express();

const PORT = process.env.PORT || 8000;

dbConnect();
// middle communications

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json("Hello there!");
});

app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "AN ERROR OCCURED WHILE FETCHING DATA." });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const param = req.params.slug;

    const data = await Book.find({ slug: param });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "AN ERROR OCCURED WHILE FETCHING DATA." });
  }
});

app.post("/api/books", async (req, res) => {
  try {
    console.log(req.body);

    const newbook = Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
     // thumbnail: req.file.filename

    });

    await Book.create(newbook);

    // const data = await Book.find({ slug: param });
    res.json("Data submitted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AN ERROR OCCURED WHILE POSTING DATA." });
  }
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`servr is running on PORT: ${PORT}`);
});
