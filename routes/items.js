const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../models/Item');

//Auth middleware
const auth = require('../middleware/auth');

// @route   GET /items
// @desc    GET All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: 1 })
    .then(items => res.send(items))
    .catch(err => console.log(err));
});

// @route   POST /items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name });

  newItem
    .save()
    .then(item => res.send(item))
    .catch(err => console.log(err));
});

// @route   DELETE /items/:id
// @desc    Delete An Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;

  Item.findById(id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, msg: err.message }));
});

module.exports = router;
