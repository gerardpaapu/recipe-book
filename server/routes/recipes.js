const express = require('express')

const db = require('../db/recipes')

const router = express.Router()

router.get('/', (req, res) => {
  const { afterId, ingredient, author } = req.query
  db.getRecipes({ afterId, ingredient, author })
    .then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const recipe = await db.byId(Number(id))
    res.json(recipe)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
