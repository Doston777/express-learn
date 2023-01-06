const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Users = require('../models/Users')

// Users get unhappiness
router.get('/unhappiness', (req, res) => {
  Users.find(
    {
      unhappiness: {$exists: true}
    },
    (err, users) => {
      err ? res.json(err) : res.json(users)
    }
  )
})

// Aggregate cards
router.get('/lookup/:id', (req, res) => {
  Users.aggregate(
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'user_id',
          as: 'books'
        }
      }
    ],
    (err, data) => {
      err ? res.json(err) : res.json(data)
    }
  )
})

// get all users
router.get('/findAll', (req, res, next) => {
  Users.find({}, (err, user) => {
    if (err) res.json(err)
    else res.json(user)
  })
})

// get find actives
router.get('/findActives', (req, res, next) => {
  Users.find({ active: false }, 'active first_name last_name', (err, user) => {
    if (err) res.json(err)
    else res.json(user)
  })
})



// Create user
router.post('/new', (req, res, next) => {
  const user = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    active: req.body.active,
    cards: req.body.cards
  })
  user.save((err, user) => {
    if (err) res.json(err)
    else res.json(user)
  })
})

// Update users
router.put('/update', (req, res) => {
  Users.update(
    {
      last_name: 'Furtado'
    },
    {
      last_name: 'Aqlliyev',
      active: true
    },
    {
      // multi: true
      // upsert: true
    },
    (err, user) => {
      if (err) res.json(err)
      else res.json(user)
    }
  )
})

// find by id
router.get('/:id', (req, res, next) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) res.json(err)
    else res.json(user)
  })
})

// Update by id
router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      active: req.body.active,
      cards: req.body.cards
    },
    (err, user) => {
    if (err) res.json(err)
    else res.json(user)
  })
})

// Delete user
router.delete('/:id', (req, res) => {
  Users.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) res.json(err)
    else res.json(user)
  })
})

module.exports = router
