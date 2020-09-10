import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, } from 'react-router-dom';
import Homepage from "./Pages/HomePage"
import AlbumPage from "./Pages/AlbumPage"
import ArtistPage from "./Pages/ArtistPage"
import SideMenu from "./Components/SideMenu/SideMenu"
import LibraryPage from "./Pages/LibraryPage"
import SearchPage from "./Pages/SearchPage"
import Player from "./Components/MusicControl/Player"
//import SongControls from "./views/components/music-control/SongControls"
import Login from "./Pages/LoginPage"
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
