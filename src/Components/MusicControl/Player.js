import React, { useState, useEffect ,useCallback} from "react";
import { useSelector, useDispatch } from "react-redux"
import { getSongPlaying, getPlayingTrack } from "../../Reducers/Selectors"

export const useAudio = () => {
    const dispatch = useDispatch()

    const url = useSelector(getPlayingTrack)
    const [audio] = useState(new Audio(url));
    const playing = useSelector(getSongPlaying)

    const toggle = useCallback(
        () => {
            if (playing) { dispatch(pause()) }
            else { dispatch(resume) }
        },
        [dispatch],
    )

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => dispatch(stop()));
        return () => {
            audio.removeEventListener('ended', () => dispatch(stop()));
        };
    }, []);

    return [playing, toggle];
};

const Player = ({hide}) => {
    const [playing, toggle] = useAudio();

    return (
        <div className={!hide ? 'musicControls' : 'hide'}>

            <div className='song-controls'>
                <div className='play-btn'>
                    <i onClick={toggle} className={"fa play-btn"} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default Player;