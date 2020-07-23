import React, { useEffect, useState, useCallback } from 'react';
import TracklistPageHeader from '../components/tracklist/TracklistPageHeader'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux"
import { findAlbumById, getCurrentAlbumId } from "../../core/album/Selectors"
import { getAlbumToToggle, getTrackToToggle } from "../../core/library/Selectors"
import { fetchToggleAlbumSavedLoading } from "../../core/library/Actions"
import { store } from "../../index"
import { getCurrentTracks } from "../../core/track/Selectors"

import TracklistItemNew from "../components/track-card/TracklistItemNew"

export default function AlbumPage(props) {
    const [tracks, setTracks] = useState([])
    const [currentAlbum, setCurrentAlbum] = useState(new Map())
    const [albumSaved, setAlbumSaved] = useState(false)
    const [trackSaved, setTrackSaved] = useState([])

    const dispatch = useDispatch()
    const storeState = store.getState()
    const currentAlbumId = getCurrentAlbumId(storeState)
    const albumsFromStore = useSelector(state => state.AlbumReducer).get("albums").find(item => item.get("albumId") === currentAlbumId)

    useEffect(() => {
        if (currentAlbumId !== undefined || "") {
            //Check the store to see if this album is saved
            const tracksToToggle = getTrackToToggle(storeState)
            if (tracksToToggle.length !== 0) {
                setAlbumSaved(getAlbumToToggle(storeState))
                setTrackSaved(getTrackToToggle(storeState))
            }
        }
    }, [storeState.TrackReducer])

    useEffect(() => {
        if (albumsFromStore !== undefined) {
            let tracks = getCurrentTracks(storeState)
            if (tracks.length !== 0) {
                setTracks(tracks)
            }
            setCurrentAlbum(albumsFromStore)
        }
    }, [storeState.AlbumReducer, props.page])

    const toggleSaveAlbum = useCallback(() => {
        setAlbumSaved(albumSaved => !albumSaved)
        dispatch(fetchToggleAlbumSavedLoading())
    }, [dispatch])

    function playTrack(trackId) {
        //play the whole album
    }

    function pauseTrack(trackId) {
        //Pause the play of the album
    }

    function playAlbum() {
        //update the currentPlayingTracks and also set the current track index to 0

    }

    return (
        <div className="AlbumPage">
            <div className="contents">
                <div className="playlistPage">
                    <div className="mainInner">
                        {currentAlbum && <TracklistPageHeader title={currentAlbum.get("albumType") ? currentAlbum.get("albumType") : "ALBUM"} imgSrc={currentAlbum.get("albumImg")}
                            artistName={currentAlbum.get("artistName")} playAlbum={playAlbum} toggleSave={toggleSaveAlbum}
                            albumName={currentAlbum.get("albumName")} key={uuidv4()} saved={albumSaved}
                        />}
                        {currentAlbum && <ul className="songList">
                            {tracks.map(each => <TracklistItemNew saved={trackSaved[tracks.indexOf(each)]}
                                index={tracks.indexOf(each)} key={uuidv4()}
                                goToAlrtistpage={props.goToArtistpage}
                                previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                                next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                            />)}

                        </ul>}
                    </div>
                </div>
                )
          </div>
        </div>)
}