import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { resume, pause, next, previous } from "../../../core/player/Actions"
import ReactAudioPlayer from 'react-audio-player';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { getPlayingTrack } from "../../../core/Selectors"

let initialEntity = new Map()
initialEntity.set("currentTrack", "")  //a track object
initialEntity.set("cursor", "")  //previous track, next track //Inside the tracks are objects of {albumId:"", tracks:[]})

export default function MusicControl({hide}) {
    const currentTrack = useSelector(getPlayingTrack)

    const dispatch = useDispatch()


    const playNextTrack = useCallback(
        () => {
            //if (playerReducer.get("currentTrack") !== "") {
              //  dispatch(next())
            //}
        },
        [dispatch],
    )

    const playPreviousTrack = useCallback(
        () => {
           // if (playerReducer.get("currentTrack") !== "") {
            //    dispatch(previous())
           // }
        },
        [dispatch],
    )

    return (
        <div className={!hide?'musicControls':'hide'}>
            <div className='song-details'>
                <p className='song-name'>{currentTrack !== ("" || undefined) ? currentTrack.get("name") : ""}</p>
                <p className='artist-name'>{currentTrack !== ("" || undefined) ? currentTrack.get("artists").join(",") : ""}</p>
            </div>
            <div className='song-controls'>
                <SkipPreviousIcon className='reverse-song' font-size="inherit" onClick={playPreviousTrack} />
                <ReactAudioPlayer controls={true} src={currentTrack !== ("" || undefined) ? currentTrack.get("url") : ""} 
                onEnded={playNextTrack}/>
                  <SkipNextIcon font-size="inherit" className="next-song icon" aria-hidden="true" onClick={playNextTrack} />
            </div>

            <div className='song-progress-container'>

                <div className='song-progress'>

                </div>

            </div>

        </div>
    )
}