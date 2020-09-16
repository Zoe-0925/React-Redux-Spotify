import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, } from 'react-router-dom';
import Homepage from "./Pages/Home.page"
import AlbumPage from "./Pages/Album.page"
import ArtistPage from "./Pages/Artist.page"
import SideMenu from "./Components/SideMenu/SideMenu"
import LibraryPage from "./Pages/Library.page"
import SearchPage from "./Pages/Search.page"
import Player from "./Components/MusicControl/Player"
//import SongControls from "./views/components/music-control/SongControls"
import Login from "./Pages/Login.page"
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
      <Player hide={!show} />
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
