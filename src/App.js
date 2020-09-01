import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { withRouter } from "react-router"
import { Route, Switch, } from 'react-router-dom';
import Homepage from "./views/pages/HomePage"
import AlbumPage from "./views/pages/AlbumPage"
import ArtistPage from "./views/pages/ArtistPage"
import SideMenu from "./views/components/side-menu/SideMenu"
import LibraryPage from "./views/pages/LibraryPage"
import SearchPage from "./views/pages/SearchPage"
import MusicControl from "./views/components/music-control/MusicControler"
import Login from "./views/pages/Login"
import './App.scss'

const App = () => {
  const [show, setShow] = useState(true)

  return (
    <div className="App">
      <div className={show ? "upperPart" : "full-screen"}>
        {show && <SideMenu />}
        <div className="main">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Home" exact component={Homepage} />
            <Route path="/albums" exact component={AlbumPage} />
            <Route path="/artists" exact component={ArtistPage} />
            <Route path="/search" exact component={SearchPage} />
            <Route path="/library" exact component={LibraryPage} />
            <Route path="/playlists" exact component={LibraryPage} />
            <Route path="/create-playlist" exact component={LibraryPage} />
          </Switch>
        </div>
      </div>
      <MusicControl hide={!show} />
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
