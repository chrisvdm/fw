const fs = require('fs')

const routesFile = './src/Routes.js'
const pageIndexFile = './src/pages/index.js'

const args = process.argv.slice(2)
const type = args[0]
const name = args[1]

const remLineContaining = (buffer, searchTerm) => {
  const fileStr = buffer.toString()
  const fileArray = fileStr.split('\n')
  const importIndex = fileArray.findIndex((line) => line.includes(searchTerm))
  if (importIndex > -1) {
    fileArray.splice(importIndex, 1)
    return fileArray.join('\n')
  } else {
    console.log(`There is no line containing ${searchTerm}`)
    return null
  }
}

// TODO:
// Does page exist?
const deletePage = (page) => {
  try {
    if (fs.existsSync(`./src/pages/${page}.js`)) {
      console.log('page exists')
      console.log(
        '=================================================================='
      )

      // Remove reference from Routes.js
      fs.readFile(pageIndexFile, (readFileError, buffer) => {
        if (readFileError) throw readFileError
        const newFileStr = remLineContaining(buffer, page)
        if (newFileStr) {
          fs.writeFile(routesFile, newFileStr, (routesWriteError) => {
            if (routesWriteError) throw routesWriteError
            console.log(`'${page}' reference removed from index.js`)
          })
        } else {
          console.error(
            'Could not find reference in Routes. Please remove the reference yourself'
          )
        }
      })

      // Remove import from index.js
      fs.readFile(routesFile, (readFileError, buffer) => {
        if (readFileError) throw readFileError
        const newFileStr = remLineContaining(buffer, page)
        if (newFileStr) {
          fs.writeFile(routesFile, newFileStr, (routesWriteError) => {
            if (routesWriteError) throw routesWriteError
            console.log(`'${page}' reference removed from Routes.js`)
          })
        } else {
          console.error(
            'Could not find reference in Routes. Please remove the reference yourself'
          )
        }
      })
    } else {
      console.log(`${page} does not exist. Doublecheck spelling :)`)
    }
  } catch (error) {
    console.error(error)
  }

  // fs.unlink(`./src/pages/${page}.js`, (fileUnlinkError) => {
  //   if (fileUnlinkError) throw fileUnlinkError
  //   console.log(`./src/pages/${page}.js has been deleted`)
  // })
  //
  // }))
}

switch (type) {
  case 'page':
    deletePage(name)
    break
  default:
    console.warn('Type undefined')
}
