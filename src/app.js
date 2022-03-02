const express = require('express');
const {
    engine
} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const todoRouter = require('./routes/todos');
const categoriesRouter = require('./routes/categories');

app.set('port', 3000);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/assets', express.static(__dirname + '/assets'));

app.set('views', __dirname + '/views');

app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {
            if_eq: function (a, b, opts) {
                if (a === b) {
                    return opts.fn(this);
                } else {
                    return opts.inverse(this);
                }
            }
        }
    }),

);

app.set('view engine', '.hbs');

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos'
}, 'single'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

app.use('/tareas', todoRouter);

app.use('/categorias', categoriesRouter);

app.get('/', (req, res) => {
    res.render('home');
});