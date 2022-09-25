import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipe } from '../apis/recipes'
export default function Recipe() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    async function update() {
      const recipe = await getRecipe(id)
      setData(recipe)
    }

    update()
  }, [id])

  if (data == null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>{data.Name}</h2>
      <h3>by {data.Author}</h3>

      <p>{data.Description}</p>
      <a href={data.url}>Read at source ({new URL(data.url).host})</a>
      <ul>
        {data.Ingredients.map((txt, idx) => (
          <li key={`ig-${idx}`}>{txt}</li>
        ))}
      </ul>
      {data.Method.map((txt, idx) => (
        <p key={`mt-${idx}`}>{txt}</p>
      ))}
    </div>
  )
}
