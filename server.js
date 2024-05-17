const express = require('express')
// const expressEjsLayout = require('express-ejs-layouts');
let homeRoute = require("./routes/homeRoute");
let voluntarioRoute = require("./routes/voluntarioRoute");
let loginRoute = require("./routes/loginRoute");
let doadoresRoute = require("./routes/doadoresRoute");
let atividadeRoute = require("./routes/atividadeRoute");
const cookieParser = require('cookie-parser');

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("home", "./home");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"))
// app.use(expressEjsLayout);

app.use("/",  homeRoute);
app.use("/voluntario", voluntarioRoute);
app.use("/doadores", doadoresRoute);
app.use("/atividades", atividadeRoute);

app.use("/login", loginRoute);

app.listen(7000, function() {
    console.log("servidor web iniciado")
})