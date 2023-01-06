const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// importing schemas
const Card = require('../models/Kitob')

// Get All Cards

router.get('/', (req, res) => {
  Card.find({}, (err, card) => {
    if (err) res.json(err)
    else res.json(card)
  })
})

// Find Card

router.get('/find', (req, res) => {
  Card.find({published: false}, 'title published', (err, data) => {
    if (err)
      res.json(err)
    else res.json(data)
  })
})

// Get Card by id
router.get('/:id', (req, res) => {
  Card.findById(req.params.id, (err, data) => {
    if (err)
      res.json(err)
    else res.json(data)
  })
})

// Update cards
router.put('/update', (req, res) => {
  Card.update(
    {
      published: false
    },
    {
      published: true
    },

    (err, data) => {
    if (err)
      res.json(err)
    else res.json(data)
  })
})

// Update card by id

router.put('/update/:id', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      published: req.body.published,
      'meta.votes': req.body.meta.votes,
      'meta.favs': req.body.meta.favs
    },
    {
      // returnDocument: 'after'
      new: true
    },
    (err, card) => {
      if (err) res.json(err)
      else res.json(card)
    }
  )
})

// Create a Card
router.post('/new', function(req, res, next) {
  const card = Card({
    title: 'Union Card',
    published: false,
    comments: [{message: 'Master Card eng zori babir'}, {message: 'metroda ishliydimi'}],
    meta: {
      votes: 104,
      favs: 100
    }
  })
  card.save((err, data) => {
    if (err) res.json(err)

    res.json(data)
  })
})

// Delete card

router.delete('/delete/:id', (req, res) => {
  Card.findByIdAndDelete(req.params.id, (err, card) => {
    if (err) res.json(err)
    else res.json(card)
  })
})

module.exports = router;
