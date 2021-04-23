import { hot } from 'react-hot-loader/root';
import { Route } from 'lib'
import { Home, About, Contact} from 'pages';
import "./main.css";

const Routes = () => {
    return(
      <>
      <Route path='/' Page={Home}/>
      <Route path='/about' Page={About}/>
      <Route path='/contact' Page={Contact}/>
      </>
    );
}

export default hot(Routes);
