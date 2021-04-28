import { findIndexAfterMatch, insertString, camelCase } from './foo'
const fs = require('fs')

const routesFile = './src/Routes.js'
const pageIndexFile = './src/pages/index.js'

const args = process.argv.slice(2)
const type = args[0]
const name = args[1]

const renderPageTemplate = (n) => {
  return `const ${n}Page = () => (<>
        <h2>${n}</h2>
        <p>Welcome to your ${n} page. Navigate to 'src/pages/${n}.js' to edit</p>
        </>)
        export default ${n}Page`
}

const createPage = (pageName) => {
  // TODO: If unsuccessful undo changes
  const page = camelCase(name)

  console.log(`Creating ${page}Page page at "src/pages/${page}Page.js"`)

  fs.writeFile(
    `./src/pages/${page}Page.js`,
    renderPageTemplate(page),
    function (err) {
      if (err) throw err

      fs.appendFile(
        pageIndexFile,
        `\nexport { default as ${page}Page } from './${page}Page'`,
        function (appendIndexError) {
          if (appendIndexError) throw appendIndexError

          fs.readFile(routesFile, 'utf8', (openRoutesError, routesData) => {
            if (openRoutesError) throw openRoutesError
            const newRouteIndex = findIndexAfterMatch(routesData, '<>')
            const newRoute = `<Route path='/${page}' Page={${page}Page} name='${page}'/>`
            const newRoutesData = insertString(
              routesData,
              newRoute,
              newRouteIndex
            )

            fs.writeFile(routesFile, newRoutesData, (rewriteRoutesError) => {
              if (rewriteRoutesError) throw rewriteRoutesError
            })
          })

          console.log('Page successfully created')
        }
      )
    }
  )
}

switch (type) {
  case 'page':
    createPage(name)
    break
  default:
    console.warn('Type undefined')
}
