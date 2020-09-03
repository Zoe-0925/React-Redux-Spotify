import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, } from 'react-router-dom';
import Homepage from "./views/pages/HomePage"
import AlbumPage from "./views/pages/AlbumPage"
import ArtistPage from "./views/pages/ArtistPage"
import SideMenu from "./views/components/side-menu/SideMenu"
import LibraryPage from "./views/pages/LibraryPage"
import SearchPage from "./views/pages/SearchPage"
import SongControls from "./views/components/music-control/SongControls"
import Login from "./views/pages/Login"
import './App.scss'

const App = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <div className={show ? "upperPart" : "full-screen"}>
        {show && <SideMenu />}
        <div className="main">
          <Switch>
            <Route exact path="/" component={() => <Login setShow={setShow} />} />
            <Route exact path="/Home" component={Homepage} />
            <Route exact path="/albums" component={AlbumPage} />
            <Route exact path="/artists" component={ArtistPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/library" component={LibraryPage} />
            <Route exact path="/playlists" component={LibraryPage} />
            <Route exact path="/create-playlist" component={LibraryPage} />
          </Switch>
        </div>
      </div>
      <SongControls hide={!show} />
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
