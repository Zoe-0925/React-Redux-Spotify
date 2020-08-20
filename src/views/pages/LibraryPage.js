import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { loadLibraryPage } from "../../core/library/Actions"
import { SAVED_ALBUMS, SAVED_ARTISTS, SAVED_TRACKS } from "../../core/Constants"
import AlbumCard from "../components/track-card/AlbumCard"
import ArtistCard from "../components/track-card/ArtistCard"
import SavedTracks from "../components/tracklist/SavedTracks"

export default function LibraryPage() {
    const [view, setView] = useState("albums")
    const libraryReducer = useSelector(state => state.LibraryReducer)
    const savedAlbums = libraryReducer.get(SAVED_ALBUMS)
    const savedArtists = libraryReducer.get(SAVED_ARTISTS)

    const dispatch = useDispatch()

    const fetchLibrary = useCallback(() => {
        dispatch(loadLibraryPage())
    }, [dispatch])

    useEffect(() => {
        if (savedAlbums !== undefined && savedAlbums.length === 0) {
            fetchLibrary()
        }
    }, [savedAlbums, savedArtists])


    function fetchAlbums() {
        setView("albums")

    }

    function fetchArtists() {
        setView("artists")
    }


    function fetchTracks() {
        setView("songs")
    }

    return (
        <div className="LibraryPage" >
            <div className="right">
                <div className="head-row" >
                    <button onClick={fetchAlbums}>Albums</button>
                    <button onClick={fetchArtists}>Artists</button>
                    <button onClick={fetchTracks}>Liked Songs</button>
                </div>

                {view === "albums" && <div className="contents" >
                    {savedAlbums !== undefined && savedAlbums.length > 0 && savedAlbums.map(each =>
                        <AlbumCard title={each.get("albumName")} subtitle={each.get("artistNames")} 
                            artistIds={each.get("artistIds")} albumId={each.get("albumId")} imgSrc={each.get("albumImg")}
                        />)}
                </div>}
                {view === "artists" && <div className="contents">
                    {savedArtists !== undefined && savedArtists.length > 0 && savedArtists.map(each =>
                        <ArtistCard title={each.get("artistName")}
                            subtitle="Artist" artistId={each.get("artistId")} imgSrc={each.get("artistImg")} />)}
                </div>}
                {view === "songs" && <SavedTracks />}
            </div>
        </div>
    )
}