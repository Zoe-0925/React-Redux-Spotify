import React, {  useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { resume, pause, next, previous } from "../../../core/player/Actions"
import ReactAudioPlayer from 'react-audio-player';
import { Icon } from 'semantic-ui-react'
import {getPlayingTrack} from "../../../core/Selectors"
import 'semantic-ui-css/semantic.min.css';

let initialEntity = new Map()
initialEntity.set("currentTrack", "")  //a track object
initialEntity.set("cursor", "")  //previous track, next track //Inside the tracks are objects of {albumId:"", tracks:[]})

export default function MusicControl() {
    const currentTrack = useSelector(getPlayingTrack)

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
        <div className='song-player-container musicControls'>
            <div className='song-details'>
                <p className='song-name'>{currentTrack!==(""||undefined)?currentTrack.get("name"):""}</p>
                <p className='artist-name'>{currentTrack!==(""||undefined)?currentTrack.get("artists").join(","):""}</p>
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
                <ReactAudioPlayer controls={true} src={currentTrack!==(""||undefined)?currentTrack.get("url"):""} onEnded={playNextTrack}
                />
            </div>

            <div className='song-progress-container'>

                <div className='song-progress'>

                </div>

            </div>

        </div>
    )
}