import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../../core/artist/Actions"
import { ReactComponent as PlayIcon } from '../../../svgs/play.svg'
import { ReactComponent as NoteIcon } from '../../../svgs/note.svg'
import { play, pause } from '../../../core/player/Actions';
import PropTypes from 'prop-types';
import { toggleTrack } from "../../../core/library/Actions"
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default function TracklistItemNew(props) {
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

    function handleClickArtist(e) {
        const artistId = e.target.id
        if (artistId !== undefined || "") {
            fetchAlbumsForArtist(e.target.id)
            props.goToAlrtistpage()
        }
    }

    function playTrack() {
        setPlayIcon(false)
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
                    {!saved &&
                        <div className="icon iconsHeart" onClick={toggleSave}>
                            <Icon name='heart outline' className="coloredIcon" size='small' />
                        </div>}
                    {saved &&
                        <div className="icon iconsHeart" onClick={toggleSave}>
                            <Icon name='heart' className="coloredIcon" size='small' />
                        </div>
                    }</span>
                <span>{props.current.get("duration")}</span>
            </div>
        </li>

    )
}

TracklistItemNew.prototype = {
    current: PropTypes.object,
    previous: PropTypes.object,
    next: PropTypes.object,
    saved: PropTypes.boolean,
    index: PropTypes.string,
}