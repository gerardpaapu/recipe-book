import React from 'react'
import { screen, render } from '@testing-library/react'
import { getRecipes, getRecipe } from '../apis/recipes'
import { MemoryRouter } from 'react-router-dom'

import App from './App'

jest.mock('../apis/recipes')

const testRecipes = [
  {
    id: 1,
    Name: 'Rice bowl',
    url: 'https://google.com/?q=Rice%20Bowl',
    Description: 'A bowl, but with rice in it',
    Ingredients: ['1 bowl', 'Rice, some cooked'],
    Author: 'Gerard Paapu',
    Method: ['Put rice in bowl', 'eat it'],
  },
  {
    id: 2,
    Name: 'Noodle bowl',
    url: 'https://google.com/?q=Noodle%20Bowl',
    Description: 'A bowl, but with noodles in it',
    Ingredients: ['1 bowl', 'Noodles, some cooked'],
    Author: 'Gerard Paapu',
    Method: ['Put noodles in bowl', 'eat them'],
  },
]

test('page header shows Recipe Book', async () => {
  getRecipes.mockImplementation(() => Promise.resolve(testRecipes))

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  const heading = await screen.findByRole('heading')
  expect(heading.innerHTML).toMatch(/Recipe Book/)
})

test('renders an <li> for each recipe', async () => {
  getRecipes.mockImplementation(() => Promise.resolve(testRecipes))
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  const li = await screen.findAllByRole('listitem')
  expect(li).toHaveLength(2)
  expect(getRecipes).toHaveBeenCalled()
})

test('displays an individual recipe', async () => {
  getRecipe.mockImplementation(() =>
    Promise.resolve({
      id: 1,
      Name: 'Rice bowl',
      url: 'https://google.com/?q=Rice%20Bowl',
      Description: 'A bowl, but with rice in it',
      Ingredients: ['1 bowl', 'Rice, some cooked'],
      Author: 'Gerard Paapu',
      Method: ['Put rice in bowl', 'eat it'],
    })
  )

  render(
    <MemoryRouter initialEntries={['/96']}>
      <App />
    </MemoryRouter>
  )
  const p = await screen.findByText(/A bowl, but with rice in it/)
  expect(p).not.toBeNull()
  expect(getRecipe).toHaveBeenCalledWith('96')
})
