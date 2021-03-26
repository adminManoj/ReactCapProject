import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login.component";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/Dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
