const express = require('express')
// const expressEjsLayout = require('express-ejs-layouts');
let homeRoute = require("./routes/homeRoute");
let voluntarioRoute = require("./routes/voluntarioRoute");
let loginRoute = require("./routes/loginRoute");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("home", "./home");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"))
// app.use(expressEjsLayout);

app.use("/",  homeRoute);
app.use("/voluntario", voluntarioRoute);
app.use("/login", loginRoute);

app.listen(4000, function() {
    console.log("servidor web iniciado")
})