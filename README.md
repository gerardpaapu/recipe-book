# Recipe Book

This is just playing around with our fullstack-boilerplate but replacing solid reliable
knex with hot new library `@donothing/kept`.

I googled for "recipes data json" and downloaded the first result, and shoved it carelessly into 
a kept store (in this case backed by sqlite3)

Then I wrote some queries over the data and ... here we are.

No schema, no migrations, just json and queries lol

This is really the heart of the thing, it provides a filtered paged results array of recipes

```javascript
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
```