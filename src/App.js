import { Route, Switch } from 'react-router-dom';
import './assets/CSS/style.css';
import Bill from './components/pages/Bill/Bill';
import Like from './components/pages/Like/Like';
import Menu from './components/pages/Menu/Menu';

const { default: Navbar } = require('./components/header/Navbar/Navbar');

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Switch>
          <Route exact path='/' component={Menu} />
          <Route exact path='/like' component={Like} />
          <Route exact path='/bill' component={Bill} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
