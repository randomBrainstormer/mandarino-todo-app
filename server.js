const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer();

// leggere il file .env
require('dotenv').config()


const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
});

const port = process.env.PORT || 5000;

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Parse "body" param in request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/login', upload.fields([]), (req, res) => {
  knex('users').select('id', 'name').where({
    email: req.body.email,
    password: req.body.password
  }).then(dati => {
    res.json(dati);
  })
});

app.post('/api/add-list', upload.fields([]), (req, res) => {
  console.log( req.body );
  knex('lists').insert(req.body).returning('id').then(result => {
    console.log('RESULT', result);
    knex('lists').where('id', result[0])
    .then(list => res.json(list));
  });
});

app.get('/api/lists', (req, res) => {
  console.log(req.params, req.query);
  knex('lists').where('userId', req.query.userId)
  .then(result => {res.json(result)})
})

app.listen(port, () => console.log(`Listening on port ${port}`));