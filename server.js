// require file
const express = require('express');
const cors = require('cors');
const data = require('./data/data');

const app = express();

// middleweare
app.use(cors());

// port
const PORT = process.env.PORT || 8080;

// route
app.get('/',(req,res,next) => {
  res.send({info: 'Welcome myshop'});
});

app.get('/products',(req,res) => {
  const keyword = req.query.keyword || "";
  const results = data.filter(product => 
    product.title.includes(keyword) || product.brand.includes(keyword)
  );
  res.status(200).json(results);
});

app.get('/products/:id',(req,res) => {
  const result = data.find(p => p.id === parseInt(req.params.id));
  res.status(200).json(result);
});


// listen method
app.listen(PORT,()=> {
  console.log(`${PORT} Server is Running...`);
});