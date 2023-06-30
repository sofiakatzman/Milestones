
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Friends from "./Friends";
import Create from "./Create"
import Settings from "./Settings"
import Milestones from "./Milestones"
import Log from './Log'
import './index.css'

function App() {

  return (
    <>
      <div>
        <Log/>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/timeline" component={Milestones} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;