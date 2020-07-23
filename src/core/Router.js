import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from "../App";
import history from './history';
import Homepage from '../views/pages/HomePage'
import AlbumPage from "../views/pages/AlbumPage"
import ArtistPage from "../views/pages/ArtistPage"
import SearchPage from "../views/pages/SearchPage"
import LibraryPage from "../views/pages/LibraryPage"
import Container from "../views/pages/Container"

export default class Routes extends Component {

    //<Route path="/Album" exact component={AlbumPage} />
    //<Route path="/Artist" exact component={ArtistPage} />
    // <Route path="/Search" exact component={SearchPage} />
    // <Route path="/Library" exact component={LibraryPage} />
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/Home" exact component={Container} />

                </Switch>
            </Router>
        )
    }
}