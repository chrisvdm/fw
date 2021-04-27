import { Route } from 'lib'
import { StandardLayout } from 'layouts'
import * as pages from 'pages';
import "./main.css";

const Routes = () => {
    return(
      <>
        <StandardLayout>
        <Route path='/' Page={pages.Home} name='Home'/>
        <Route path='/about' Page={pages.About} name='About'/>
        <Route path='/contact' Page={pages.Contact} name='Contact'/>
      </StandardLayout>    
      </>
    );
}

export default hot(Routes);
