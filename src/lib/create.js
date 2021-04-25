var fs = require('fs')

const args = process.argv.slice(2);
const type = args[0]
const name = args[1]

const renderPageTemplate = n => {
    return `const ${n}Page = () => (<>
        <h2>${n}</h2>
        <p>Welcome to your ${n} page. Navigate to 'src/pages/${n}.js' to edit</p>
        </>)`
}

const camelCase = w => w.charAt(0).toUpperCase() + w.slice(1)

const createPage = pageName => {
    const page = camelCase(name)
    console.log(`Creating ${page}Page page at "src/pages/${page}Page.js"`)
    
    fs.writeFile(`./src/pages/${page}Page.js`, renderPageTemplate(page), function (err) {
    if (err) throw err;
    fs.appendFile('./src/pages/index.js',`export { default as ${page}Page } from './${page}Page'`, function(error){
        if(error) throw error;
        console.log('Page successfully created');
    })
  });
}

switch(type){
    case 'page':
        createPage(name)
        break;
        default:
            console.warn('Type undefined')
}


