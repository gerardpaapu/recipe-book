const { connection } = require('./connection')
const data = require('./recipes.json')

async function main() {
  const store = connection()
  for (const recipe of data) {
    await store.add(recipe)
  }
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
