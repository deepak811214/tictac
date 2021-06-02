import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from './components/game/Game';
import Welcome from './components/welcome/Welcome'
import Detail from './components/detail/Detail'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/home" exact component={Welcome} />
            <Route path="/detail/:mode" exact component={Detail}/>
            <Route path="/game" exact component={Game}/>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
