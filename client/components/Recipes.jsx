import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getRecipes } from '../apis/recipes'

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { afterId, ingredient, author } = Object.fromEntries(searchParams)

  const [data, setData] = useState(null)

  const handleFormChange = (evt) => {
    const formData = new FormData(evt.target.form)
    const data = new URLSearchParams(formData)
    setSearchParams(data)
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault()
  }

  useEffect(() => {
    async function update() {
      const recipe = await getRecipes({ afterId, ingredient, author })
      setData(recipe)
    }

    update()
  }, [afterId, ingredient, author])

  if (data == null) {
    return <p>Loading...</p>
  }

  const lastId = data.reduce((last, item) => {
    return Math.max(+item.id, last)
  }, 0)
  const next = new URLSearchParams(searchParams)
  next.set('afterId', lastId)

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h3>Filter recipes by&hellip;</h3>
        <p>
          <label>
            Author:{' '}
            <input
              type="text"
              value={author}
              onChange={handleFormChange}
              name="author"
              placeholder="Author"
            />
          </label>
        </p>
        <p>
          <label>
            Ingredient:{' '}
            <input
              type="text"
              value={ingredient}
              onChange={handleFormChange}
              name="ingredient"
              placeholder="Ingredient"
            />
          </label>
        </p>
      </form>
      <ul>
        {data.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/${recipe.id}`}>{recipe.Name}</Link>
          </li>
        ))}
      </ul>
      <Link to={'?'}>Home</Link>
      <Link to={`?${next}`}>Next</Link>
    </>
  )
}
