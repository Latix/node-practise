const express = require("express");
const morgan  = require("morgan");
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// Initiate Express
const app = express();

// Connnect to MongoDB
const dbURI = "mongodb+srv://kamsi:Password123@cluster0.9hlj4.mongodb.net/practise?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => app.listen(3000))
.catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// Listen for reqquests

// app.use((req, res, next) => {
//     console.log("New Request")
//     console.log(req.hostname);
//     next();
// })
app.use(express.static("public"));
app.use(express.urlencoded({ extended:true }));
app.use(morgan("dev"));


// Blog Routes
app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    // res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
        {
            title: "Arms Dealer",
            snippet: "This is real!"
        }
    ];
    res.render('index', {
        title: "Home",
        blogs,
    });
});

app.get('/about', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.render("about");
});

app.get('/blogs/create', (req, res) => {
    res.render("create");
});


// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// 404
app.use((req, res) => {
    res.status(404).render("404");
})