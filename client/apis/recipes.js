export async function getRecipes({ afterId, ingredient, author }) {
  const params = {}
  if (afterId) {
    params.afterId = afterId
  }

  if (ingredient) {
    params.ingredient = ingredient
  }

  if (author) {
    params.author = author
  }

  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`/api/v1/recipes?${qs}`, { method: 'GET' })
  const data = await res.json()

  return data
}

export async function getRecipe(id) {
  const res = await fetch(`/api/v1/recipes/${id}`, { method: 'GET' })
  const data = await res.json()

  return data
}
