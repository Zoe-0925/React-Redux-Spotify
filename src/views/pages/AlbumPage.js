import React, { useState, useCallback } from 'react';
import TracklistPageHeader from '../components/tracklist/TracklistPageHeader'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux"
import { fetchToggleAlbumSavedLoading } from "../../core/library/Actions"
import {
    getCurrentTracks, getTrackToToggle, getAlbumsFromStore
} from "../../core/Selectors"

import TracklistItem from "../components/track-card/TracklistItem"

export default function AlbumPage() {
    const [albumSaved, setAlbumSaved] = useState(false)
    const dispatch = useDispatch()
    const albumsFromStore = useSelector(getAlbumsFromStore)
    const tracks = useSelector(getCurrentTracks)
    const trackSaved = useSelector(getTrackToToggle) 

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
        <div className="mainInner">
            {albumsFromStore && <TracklistPageHeader title={albumsFromStore.get("albumType") ? albumsFromStore.get("albumType") : "ALBUM"} imgSrc={albumsFromStore.get("albumImg")}
                artistName={albumsFromStore.get("artistName")} playAlbum={playAlbum} toggleSave={toggleSaveAlbum}
                albumName={albumsFromStore.get("albumName")} key={uuidv4()} saved={albumSaved}
            />}
            {albumsFromStore && <ul className="songList">
                {tracks.map(each => <TracklistItem saved={trackSaved[tracks.indexOf(each)]}
                    index={tracks.indexOf(each)} key={uuidv4()}
                    previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                    next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                />)}

            </ul>}
        </div>)
}