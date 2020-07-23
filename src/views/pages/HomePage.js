import React, { useEffect, useState } from "react";
import TrackCardList from "../components/tracklist/TrackCardList"
import { RECENTLY_PLAYED, USERS_TOP_TRACKS, } from "../../core/Constants"
import { useSelector } from "react-redux"
import SideMenu from "../components/side-menu/SideMenu"

export default function Homepage(props) {
        const [albums, setAlbums] = useState([])

        const [recentlyPlayedAlbumIds, setRecentlyPlayed] = useState([])
        const [userTopAlbumIds, setUserTop] = useState([])


        const libraryReducer = useSelector(state => state.LibraryReducer)
        const albumState = useSelector(state => state.AlbumReducer).get("albums")

        useEffect(() => {
                if (libraryReducer.get(RECENTLY_PLAYED) !== []) {
                        setRecentlyPlayed(libraryReducer.get(RECENTLY_PLAYED))
                        setAlbums(albumState)
                }
                if (libraryReducer.get(USERS_TOP_TRACKS) !== []) {
                        setUserTop(libraryReducer.get(USERS_TOP_TRACKS))
                        if (albumState !== albums) {
                                setAlbums(albumState)
                        }
                }
                if (albums.length === 0 && libraryReducer.get(USERS_TOP_TRACKS).length === 0) {
                        //get the token from the local storage, and save the token, and init home page
                }
        }, [libraryReducer, albumState, albums])

        return (
                <div className="Homepage">
                        <div className="contents">
                                <div className="playlist" >
                                        <TrackCardList fetchList={RECENTLY_PLAYED} albums={albums} albumIds={recentlyPlayedAlbumIds}
                                                limits={6} goToAlbumPage={props.goToAlbumPage} goToArtistpage={props.goToArtistpage}
                                        />
                                </div>
                                <div className="playlist" >
                                        <TrackCardList goToAlbumPage={props.goToAlbumPage} goToArtistpage={props.goToArtistpage}
                                        fetchList={USERS_TOP_TRACKS} albums={albums} albumIds={userTopAlbumIds} limits={6} />
                                </div>
                        </div>
                </div>)
}