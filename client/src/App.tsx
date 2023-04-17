import './App.css';
import {Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Splash from "./components/Splash";







function App() {
    return (
        <Switch>
            <Route path="/home">
                <Home/>
            </Route> 
            <Route path="/">
                <Splash/>
            </Route>

        </Switch>

    );
}

export default App;
