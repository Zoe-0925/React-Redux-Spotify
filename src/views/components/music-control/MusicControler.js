import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { resume, pause, next, previous } from "../../../core/player/Actions"
import ReactAudioPlayer from 'react-audio-player';
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

let initialEntity = new Map()
initialEntity.set("currentTrack", "")  //a track object
initialEntity.set("cursor", "")  //previous track, next track //Inside the tracks are objects of {albumId:"", tracks:[]})

export default function MusicControl() {
    const [audioSrc, setAudioSrc] = useState("")
    const [trackName, setTrackName]= useState("")
    const [artistName, setArtistNName]= useState("")

    const playerReducer = useSelector(state => state.PlayerReducer)

    useEffect(() => {
        let currentTrack = playerReducer.get("currentTrack")
        console.log("current track",  currentTrack)
        if (currentTrack !== "" && currentTrack !== undefined) {
            setAudioSrc(currentTrack.get("url"))
            setTrackName(currentTrack.get("name"))
            setArtistNName(currentTrack.get("artists").join(","))
        }
    }, [playerReducer])

    const dispatch = useDispatch()

    const playNextTrack = useCallback(
        () => {
            if (playerReducer.get("currentTrack")!== "") {
                dispatch(next())
            }
        },
        [dispatch],
    )

    const playPreviousTrack = useCallback(
        () => {
            if (playerReducer.get("currentTrack") !== "") {
                dispatch(previous())
            }
        },
        [dispatch],
    )

    return (
        <div className='song-player-container' style={{ color: "black" }}>
            <div className='song-details'>
                <p className='song-name'>{trackName}</p>
                <p className='artist-name'>{artistName}</p>
            </div>
            <div className='song-controls'>

                <div className='reverse-song'>
                    <i className="fa fa-step-backward reverse" aria-hidden="true" />
                    <Icon name='step backward' size='large' onClick={playPreviousTrack}
                        className="icon" aria-hidden="true" />
                </div>
                <div className='next-song'>
                    <Icon name='step forward' size='large' onClick={playNextTrack}
                        className="icon" aria-hidden="true" />
                </div>
                <ReactAudioPlayer controls={true} src={audioSrc} onEnded={playNextTrack}
                />
            </div>

            <div className='song-progress-container'>

                <div className='song-progress'>

                </div>

            </div>

        </div>
    )
}