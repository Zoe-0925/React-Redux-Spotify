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

export default function TracklistItem(props) {
    const [saved, setSaved] = useState(props.saved)

    //TODO 
    //double click the container => play song
    //https://medium.com/@anilchaudhary453/double-click-using-react-hooks-4fea2292d3a4

    const [playIcon, setPlayIcon] = useState(true)

    const dispatch = useDispatch()

    const fetchAlbumsForArtist = useCallback(
        (id) => {
            dispatch(fetchArtistsAlbumsLoading(id))
        }, [dispatch]
    )

    //TODO debug
    function handleClickArtist(e) {
        const artistId = e.target.id
        if (artistId !== undefined || "") {
            fetchAlbumsForArtist(e.target.id)
            history.push("/artists")
        }
    }

    function playTrack() {
        setPlayIcon(false)
        //TODO update
        //to give a list and the current song id
        dispatchPlay(props.current, props.previous, props.next)
    }

    function pauseTrack() {
        setPlayIcon(true)
        dispatchPause()
    }


    const dispatchPlay = useCallback(
        (current, previous, next) => dispatch(play(current, previous, next),
            [dispatch]
        ))

    const dispatchPause = useCallback(
        () => dispatch(pause()), [dispatch]
    )

    const handleToggleTrack = useCallback(
        () => dispatch(toggleTrack(props.current.get("id"), props.index)), [dispatch]
    )

    const toggleSave = () => {
        setSaved(saved => !saved)
        handleToggleTrack()
    }

    return (
        <li>
            <div className="songIcon">
                {!playIcon && <NoteIcon className="noteI" onClick={pauseTrack} />}
                {playIcon && <PlayIcon className="playI" onClick={playTrack} />}

            </div>
            <div className="songDetails">
                <h3 >{props.current.get("name")}</h3>
                {props.current.get("artists") !== undefined && props.current.get("artists").map(each => <span className="artist-name" id={each.get("artistId")}
                    key={uuidv4()} onClick={handleClickArtist}>{each.get("artistName") + ", "} </span>)}
            </div>
            <div className="songTime">
                <span>
                    {!saved && <FavoriteBorderIcon className="icon iconsHeart" fontSize="inherit" onClick={toggleSave} />}
                    {saved && <FavoriteIcon className="icon iconsHeart" fontSize="inherit" onClick={toggleSave} />}</span>
                <span>{props.current.get("duration")}</span>
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