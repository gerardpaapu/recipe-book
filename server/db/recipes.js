const { connection } = require('./connection')

const db = connection()

async function getPage(lastId = 0) {
  const recipes = await db.query((recipes) =>
    recipes.where((recipe) => recipe.id().gt(lastId)).limit(10)
  )

  return recipes
}

async function getRecipes({ afterId, ingredient, author }) {
  const recipes = await db.query((recipes) => {
    if (ingredient && ingredient.length >= 3) {
      recipes = recipes.where((r) =>
        r.get('Ingredients').any((ig) => ig.like(`%${ingredient}%`))
      )
    }

    if (author && author.length >= 3) {
      recipes = recipes.where((r) => r.get('Author').like(`%${author}%`))
    }

    if (afterId != null && !isNaN(afterId)) {
      recipes = recipes.where((recipe) => recipe.id().gt(afterId))
    }

    return recipes.limit(10)
  })

  return recipes
}

async function byId(id) {
  return await db.get(id)
}

module.exports = { getPage, getRecipes, byId }
