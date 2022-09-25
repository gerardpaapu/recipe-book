const { Store } = require('@donothing/kept')
const Path = require('node:path')

/**
 * @return {import('@donothing/kept').IKept}
 */
const connection = () => Store(Path.join(__dirname, 'dev.sqlite3'))

module.exports = {
  connection,
}
