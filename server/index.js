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
    console.log(param);
    const data = await Book.find({ slug: param });
    res.json(data);
  } catch (error) {}
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`servr is running on PORT: ${PORT}`);
});
