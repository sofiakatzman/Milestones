import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Friends from "./Friends";
import Create from "./Create";
import Settings from "./Settings";
import Milestones from "./Milestones";
import Log from './Log';
import Authentication from "./Authentication";
import './index.css';
import { useState } from "react";


function App() {
  const [user, updateUser] = useState(null)

  return (
    <div>
      <Log />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/create" element={<Create />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/timeline" element={<Milestones />} />
          <Route path="/authentication" element={<Authentication updateUser={updateUser}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;