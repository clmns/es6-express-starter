import http from 'http';
import url from "url";
import routes from "./routes/index";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import errorHandler from "errorhandler";
import passport from "passport";
import handlebars from "express-handlebars";

var app = express();

app.set('views', __dirname + '/views');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
else if (env === 'production') {
    app.use(errorHandler());
}

app.get('/', routes.index);

app.listen(3000, function(){
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});

export var App = app;