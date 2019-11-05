const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = config.get('MONGO_URI');

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
app.use('/items', require('./routes/items'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

//Serve static assets
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Listening to Port
app.listen(port, () => console.log(`Server started on PORT ${port} ... `));
