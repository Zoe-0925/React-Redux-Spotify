import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../../core/artist/Actions"
import { ReactComponent as PlayIcon } from '../../../svgs/play.svg'
import { ReactComponent as NoteIcon } from '../../../svgs/note.svg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { play, pause } from '../../../core/player/Actions';
import PropTypes from 'prop-types';
import { toggleTrack } from "../../../core/library/Actions"
import history from "../../../core/history"

//TODO highly buggy. Check
export const useSaveTrack = (initialSaved) => {
    const [saved, setSaved] = useState(initialSaved)

    const dispatch = useDispatch()

    const handleToggleTrack = useCallback(
        (id, index) => dispatch(toggleTrack(id, index)), [dispatch]
    )

    const toggleSave = () => {
        setSaved(saved => !saved)  //Update the local state
        handleToggleTrack()    //Update the global state to sync with the local state
    }

    return { saved, toggleSave }
}

export const usePlayTrack = (current) => {
    const [playIcon, setPlayIcon] = useState(true)

    const dispatch = useDispatch()

    const dispatchPlay = useCallback(
        (current) => dispatch(play(current),
            [dispatch]
        ))

    const dispatchPause = useCallback(
        () => dispatch(pause()), [dispatch]
    )

    function playTrack(current) {
        setPlayIcon(false)
        dispatchPlay(current)
    }

    function pauseTrack() {
        setPlayIcon(true)
        dispatchPause()
    }

    return { playIcon, playTrack, pauseTrack }
}

export const useFetchArtistPage = () => {
    const dispatch = useDispatch()

    const fetchAlbumsForArtist = useCallback(
        (id) => {
            dispatch(fetchArtistsAlbumsLoading(id))
        }, [dispatch]
    )

    function handleClickArtist(e) {
        const artistId = e.target.id
        if (artistId !== undefined || "") {
            fetchAlbumsForArtist(e.target.id)
            history.push("/artists")
        }
    }

    return { handleClickArtist }
}

export default function TracklistItem({ initialSaved, current, index}) {
    const { handleClickArtist } = useFetchArtistPage()
    const { playIcon, playTrack, pauseTrack } = usePlayTrack(current, index)
    const { saved, toggleSave } = useSaveTrack(initialSaved)

    return (
        <li>
            <div className="songIcon">
                {!playIcon && <NoteIcon className="noteI" onClick={pauseTrack} />}
                {playIcon && <PlayIcon className="playI" onClick={playTrack} />}

            </div>
            <div className="songDetails">
                <h3 >{current.get("name")}</h3>
                {current.get("artists") !== undefined && current.get("artists").map(each => <span className="artist-name" id={each.get("artistId")}
                    key={uuidv4()} onClick={handleClickArtist}>{each.get("artistName") + ", "} </span>)}
            </div>
            <div className="songTime">
                <span>
                    {!saved && <FavoriteBorderIcon className="icon iconsHeart" fontSize="inherit" onClick={toggleSave} />}
                    {saved && <FavoriteIcon className="icon iconsHeart" fontSize="inherit" onClick={toggleSave} />}</span>
                <span>{current.get("duration")}</span>
            </div>
        </li>

    )
}

TracklistItem.prototype = {
    current: PropTypes.object,
    previous: PropTypes.object,
    next: PropTypes.object,
    saved: PropTypes.boolean,
    index: PropTypes.string,
}