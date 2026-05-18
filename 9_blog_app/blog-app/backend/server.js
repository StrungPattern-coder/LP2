const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const Blog = require("./models/Blog");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());


mongoose.connect(
    "mongodb+srv://lp2_user:lp2password123@cluster0.fasrzsm.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


app.get("/", (req, res) => {

    res.send("Blog Backend Running");

});


app.get("/blogs", async (req, res) => {
    try {
        // Return most recent first.
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blogs" });
    }
});


app.post("/blogs", async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: "Failed to publish blog" });
    }
});


app.delete("/blogs/:id", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete blog" });
    }
});

app.put('/blogs/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updated = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: "Failed to update blog" });
    }
});

app.use((err, req, res, next) => {
    if (err && err.message === "Not allowed by CORS") {
        res.status(403).json({ message: err.message, origin: req.headers.origin || null });
        return;
    }
    next(err);
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});