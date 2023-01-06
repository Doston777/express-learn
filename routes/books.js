const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Books = require('../models/Books')

// Lookup relationships
router.get('/lookup/:id', (req, res, next) => {
  Books.aggregate(
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'users'
        }
      },
      {
        $unwind: '$users'
      },
      {
        $project: {
          title: 1,
        users: "$users"
        }
      }
    ],
    (err, data) => err ? res.json(err) : res.json(data)
  )
})

// Sort, skip, limit aggrs
router.get('/sorting/:sort', (req, res) => {
  Books.aggregate(
    [
      {
        $sort: {
          [req.params.sort] : Number(req.query.sort_by)
        }
      },
      {
        $skip: (Number(req.query.page) - 1) * req.query.limit 
      },
      {
        $limit: Number(req.query.limit)
      }
    ],
    (err,data) => err ? res.json(err) : res.json(data)
  )
})

// Aggregate by key
router.get('/project', (req, res) => {
  Books.aggregate(
    [
      {
        $project: {
          title: 1 
        }
      }
    ],
    (err,data) => err ? res.json(err) : res.json(data)
  )
})

// Aggregate books
router.get('/aggregate/:group', (req, res) => {
  Books.aggregate(
    [
      {
        $group: {
          _id: `$${req.params.group}`,
          dona: { $sum: 1 }
        }
      }
    ],
    (err, result) => {
      if (err)
        res.json(err)
      else
        console.log('Test')
        res.json(result)
    }
  )
})

// Pagination books
router.get('/pagination', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit

  Books.find({}, (err, cards) => {
    err ? res.json(err) : res.json(cards)
  }).skip((page - 1) * limit).limit(limit)
})

// Sort books by title
router.get('/sort/:by', (req, res) => {
  Books.find({}, (err, books) => {
    err ? res.json(err) : res.json(books)
  }).sort({title: req.params.by, in_stock: req.body.sort_order})
})

// Create a new book
router.post('/new', (req, res) => {
  const {...keys} = req.body
  const book = new Books({...keys})
  book.save((err, book) => {
    if (err) res.json(err)
    else res.json(book)
  })
})

// Update book by id
router.put('/update/:id', (req, res) => {
  const {...body_keys} = req.body
  Books.findByIdAndUpdate(
    req.params.id,
    {
      ...body_keys
    },
    {
      new: true
    },
    (err, book) => {
      if (err) res.json(err)
      else res.json(book)
    }
  )
})

// Delete book by id
router.delete('/delete/:id', (req, res) => {
  Books.findByIdAndDelete(req.params.id, (err, book) => {
    err ? res.json(err) : res.json(book)
  })
})

// Get all books
router.get('/', (req, res, next) => {
  Books.find({}, (err, books) => {
    if (err) res.json(err)
    else res.json(books)
  })
})



module.exports = router