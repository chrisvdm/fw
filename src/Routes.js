import { hot } from 'react-hot-loader/root';
import { Route } from 'lib'
import { StandardLayout } from 'layouts'
import { Home, About, Contact} from 'pages';
import "./main.css";

const Routes = () => {
    return(
      <>
      <StandardLayout>
        <Route path='/' Page={Home} name='Home'/>
        <Route path='/about' Page={About} name='About'/>
        <Route path='/contact' Page={Contact} name='Contact'/>
      </StandardLayout>    
      </>
    );
}

export default hot(Routes);
