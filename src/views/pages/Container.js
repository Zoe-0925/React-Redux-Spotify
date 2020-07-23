import React, { useState } from "react";
import Homepage from "./HomePage"
import AlbumPage from "./AlbumPage"
import ArtistPage from "./ArtistPage"
import SideMenu from "../components/side-menu/SideMenu"
import LibraryPage from "./LibraryPage"
import SearchPage from "./SearchPage"
import MusicControl from "../components/music-control/MusicControler"

export default function Container() {
        const [page, setPage] = useState("home-page")

        //TODO no state, so it did not update!

        function goToHomepage() {
                setPage("home-page")
        }

        function goToAlbumpage() {
                setPage("album-page")
        }

        function goToArtistpage() {
                setPage("artist-page")
        }

        function goToLibrary() {
                setPage("library-page")
        }

        function goToSearch() {
                setPage("search-page")
        }


        return (
                <div className="Container">
                        <div className="upperPart" >
                                <div className="sidebar">
                                        <SideMenu goToHomepage={goToHomepage} goToArtistpage={goToArtistpage}
                                                goToSearch={goToSearch} goToLibrary={goToLibrary} />
                                </div>
                                <div className="main">
                                        {page === "home-page" && <Homepage goToAlbumPage={goToAlbumpage}
                                                goToArtistpage={goToArtistpage} page={page} />}
                                        {page === "album-page" && <AlbumPage goToArtistpage={goToArtistpage} page={page} />}
                                        {page === "artist-page" && <ArtistPage goToAlbumPage={goToAlbumpage} page={page} />}
                                        {page === "library-page" && <LibraryPage page={page} goToAlbumPage={goToAlbumpage} goToArtistpage={goToArtistpage}/>}
                                        {page === "search-page" && <SearchPage page={page} />}
                                </div>
                        </div>
                        <div className="musicControls">
                                <MusicControl />
                        </div>
                </div>

        )
}