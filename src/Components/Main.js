import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Home'
import About from './About'
import Login from './Login'
import Register from './Register'
import Protected from "./Protected";
import New_Entry from "./New_Entry";
import SearchData from "./search";

function Main() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/login'><Login /></Route>
                    <Route path='/register'><Register /></Route>
                    <Route path='/about'><Protected Cmp={About} /></Route>
                    <Route path='/new-entry'><Protected Cmp={New_Entry} /></Route>
                    <Route path='/search'><Protected Cmp={SearchData} /></Route>
                    <Route path='/'><Protected Cmp={Home} /></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Main