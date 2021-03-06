import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TracklistPageHeader from '../Components/TrackList/Track.pageheader'
import { useDispatch, useSelector } from "react-redux"
import { fetchToggleAlbumSavedLoading } from "../Actions/LibraryActions"
import {
    getCurrentTracks, getTrackToToggle, getAlbumsFromStore
} from "../Reducers/Selectors"
import TracklistItem from "../Components/TrackList/Track.item"

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

    return (
        <div className="mainInner">
            {albumsFromStore && <TracklistPageHeader title={albumsFromStore.get("albumType") ? albumsFromStore.get("albumType") : "ALBUM"} imgSrc={albumsFromStore.get("albumImg")}
                artistName={albumsFromStore.get("artistName")} toggleSave={toggleSaveAlbum}
                albumName={albumsFromStore.get("albumName")} key={uuidv4()} saved={albumSaved}
            />}
            {albumsFromStore && <ul className="songList">
                {tracks.map(each => <TracklistItem initialSaved={trackSaved[tracks.indexOf(each)]}
                    index={tracks.indexOf(each)} key={uuidv4()}
                    previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                    next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                />)}

            </ul>}
        </div>)
}