const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");

const AuthMiddleware = require('./middlewares/authMiddleware');

let homeRoute = require("./routes/homeRoute");
let voluntarioRoute = require("./routes/voluntarioRoute");
let loginRoute = require("./routes/loginRoute");
let doadoresRoute = require("./routes/doadoresRoute");
let atividadeRoute = require("./routes/atividadeRoute");
let eventoRoute = require("./routes/eventoRoute");
let vitrineRouter = require('./routes/vitrineRoute');
let patrimonioRoute = require("./routes/patrimonioRoute");
let produtoRoute = require('./routes/produtoRoute');
let vendasRouter = require('./routes/vendasRoute');

let auth = new AuthMiddleware();
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("home", "./home");

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//configuração da nossa página de layout pública
app.set('layout', './layout');
app.use(expressLayouts);

app.use("/",  homeRoute);
app.use("/login", loginRoute);
app.use("/vitrine", vitrineRouter);

// app.use(auth.verificarUsuarioLogado);
app.use("/voluntarios", voluntarioRoute);
app.use("/doadores", doadoresRoute);
app.use("/atividades", atividadeRoute);
app.use("/evento", eventoRoute);
app.use("/login", loginRoute);
app.use("/patrimonio", patrimonioRoute);
app.use("/produtos", produtoRoute);
app.use("/vendas", vendasRouter);


//implementando pagina 404
app.get("*", function(req, res) {
    res.status(404).render("404");
});

global.CAMINHO_IMG_EVENTO_BROWSER = "/img/eventos/"
global.CAMINHO_IMG_BROWSER = "/img/produtos/"
global.RAIZ_PROJETO = __dirname;

app.listen(7000, function() {
    console.log("servidor web iniciado")
})
