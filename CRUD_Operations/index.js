const express = require('express'); 
 
 
const mongoose = require('mongoose'); 
 
const app = express(); 
app.use(express.json()); 
 
mongoose.connect('mongodb://127.0.0.1:27017/productDB'); 
 
const Product = mongoose.model('Product', new mongoose.Schema({ 
  name: String, 
  price: Number, 
  category: String 
})); 
 
 
app.get('/products', async (req, res) => res.json(await Product.find())); 
 
app.get('/products/:id', async (req, res) => { 
  const p = await Product.findById(req.params.id); 
  res.json(p || { message: 'Not found' }); 
}); 
 
app.post('/products', async (req, res) => res.status(201).json(await new Product(req.body).save())); 
 
app.put('/products/:id', async (req, res) => { 
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
  res.json(p || { message: 'Not found' }); 
}); 
 
 
app.delete('/products/:id', async (req, res) => { 
  const p = await Product.findByIdAndDelete(req.params.id); 
  res.json(p ? { message: 'Deleted', product: p } : { message: 'Not found' }); 
}); 
 
app.listen(3000, () => console.log('Server running on http://localhost:3000'));