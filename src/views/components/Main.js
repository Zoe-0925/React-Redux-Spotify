
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AlbumPage from "../pages/AlbumPage"
import Homepage from "../pages/home-page"
import ArtistPage from "../pages/ArtistPage"
import App from "../../App"

export default function Main(){

    return (
        <div className="main">
            <div className="upperNav">dummy text</div>
            <div className="mainContent">
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/Homepage" exact component={Homepage} />
                    <Route path="/Album" exact component={AlbumPage} />
                    <Route path="/Artist" exact component={ArtistPage} />
                </Switch>
            </div>
        </div>
    )
}
