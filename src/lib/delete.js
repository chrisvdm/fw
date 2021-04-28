const fs = require('fs')

const routesFile = './src/Routes.js'
const pageIndexFile = './src/pages/index.js'

const args = process.argv.slice(2)
const type = args[0]
const name = args[1]

// TODO:
// Does page exist?
const deletePage = (n) => {
  const page = `${n}Page`
  try {
    if (fs.existsSync(`./src/pages/${page}.js`)) {
      // delete
    }
  } catch (err) {
    console.error(err)
  }
}

switch (type) {
  case 'page':
    deletePage(name)
    break
  default:
    console.warn('Type undefined')
}
