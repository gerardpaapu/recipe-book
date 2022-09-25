const { Store: SQliteStore } = require('@donothing/kept')
const { Store: PGStore } = require('@donothing/kept/dist/driver/postgres/store')
const Path = require('node:path')

/**
 * @return {import('@donothing/kept').IKept}
 */
const connection = () => {
  if (process.env.DATABASE_URL) {
    return PGStore(process.env.DATABASE_URL)
  } else {
    return SQliteStore(Path.join(__dirname, 'dev.sqlite3'))
  }
}

module.exports = {
  connection,
}
