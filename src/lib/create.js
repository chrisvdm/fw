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

const createPage = pageName => {
    console.log(`Creating ${name}Page page at "src/pages/${name}Page.js"`)
    
    fs.writeFile(`./src/pages/${name}Page.js`, renderPageTemplate(name), function (err) {
    if (err) throw err;
    fs.appendFile('./src/pages/index.js',`export { default as ${name}Page } from './${name}Page.js'`, function(error){
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


