require("dotenv").config();

const dbConnect = require("./connectDB");

const cors = require("cors");

const express = require("express");

const Book = require("./models/Book");

const app = express();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//const upload = multer({ storage: storage });
//const upload = multer();

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
    console.log("here!");
    const param = req.params.slug;

    const data = await Book.find({ slug: param });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AN ERROR OCCURED WHILE FETCHING DATA." });
  }
});

// to edit an existing book
app.put("/api/books:slug", upload.single("thumbnail"), async (req, res) => {
  try {
    //console.log(req.file);
    // get filename

    const bookID = req.body.bookID;

    const modifybook = Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,

      // thumbnail: req.file.filename
    });

    if (req.file) {
      modifybook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookID, modifybook);
    //await Book.create(newbook);

    // const data = await Book.find({ slug: param });
    res.json("Book updated");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AN ERROR OCCURED WHILE updating book" });
  }
});

// to create a new book

app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    console.log(req.file);
    // get filename
    const thumbnail = req.file.filename;

    const newbook = Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,

      // thumbnail: req.file.filename
    });

    await newbook.save();
    //await Book.create(newbook);

    // const data = await Book.find({ slug: param });
    res.json("Data submitted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AN ERROR OCCURED WHILE creating book." });
  }
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`servr is running on PORT: ${PORT}`);
});
