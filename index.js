const express = require('express');
const mongoose = require('mongoose');
const mongoURI = require('./config/keys').MONGO_URI;
const items = require('./routes/items');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());

//Connection to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected ...'))
  .catch(err => console.error(err));

//Use Item routes
app.use('/items', items);

//Listening to Port
app.listen(port, () => console.log(`Server started on PORT ${port} ... `));
