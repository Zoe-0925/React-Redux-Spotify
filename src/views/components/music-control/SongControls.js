import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types';
import { increaseSongTime } from "../../../core/player/Actions"
import { getSongPlaying, getSongPaused, getTimeElapsed, getSongs, getTrackNameById, getSongDetails } from "../../../core/Selectors"
import { play, pause, resume, stop, } from "../../..//core/player/Actions"

export default function SongControls({ hide }) {
  const [audio, setAudio] = useState()

  const dispatch = useDispatch()

  const songPlaying = useSelector(getSongPlaying)
  const songPaused = useSelector(getSongPaused)
  const timeElapsed = useSelector(getTimeElapsed)
  const songs = useSelector(getSongs)
  const songName = useSelector(getTrackNameById)
  const songDetails = useSelector(getSongDetails)

  const [state, setState] = useState({
    timeElapsed: timeElapsed
  })

  useEffect(() => {
    setState({
      timeElapsed: timeElapsed
    });
    if (!songPlaying) {
      clearInterval(state.intervalId);
    }

    if (songPlaying && timeElapsed === 0) {
      clearInterval(state.intervalId);
      calculateTime();
    }
  }, [songPlaying, timeElapsed])


  const audioControl = (song) => {
    if (audio === undefined) {
      dispatch(play(song.track))
      setAudio(new Audio(song.track.preview_url));
      audio.play();
    } else {
      dispatch(stop())
      audio.pause();
      dispatch(play(song.track))
      setAudio(new Audio(song.track.preview_url));
      audio.play();
    }
  };

  function calculateTime() {

    const intervalId = setInterval(() => {
      if (songPaused) { return }
      if (state.timeElapsed === 30) {
        clearInterval(state.intervalId);
        dispatch(stop())
      }
      increaseSongTime(state.timeElapsed + 1);
    }, 1000);

    setState({
      intervalId: intervalId
    });
  }

  const getSongIndex = () => {
    const currentIndex = songs.map((song, index) => {
      //TODO check this
      if (song.track === songDetails) {
        return index;
      } else {
        return undefined;
      }
    }).filter(item => {
      return item !== undefined;
    })[0];
    return currentIndex;
  }

  const nextSong = () => {
    let currentIndex = getSongIndex();
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1]);
  }

  const prevSong = () => {
    let currentIndex = getSongIndex();
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1]);
  }

  const pauseSong = () => {
    dispatch(pause())
  }

  const resumeSong = () => {
    dispatch(resume())
  }

  const showPlay = songPaused ? 'fa fa-play-circle-o play-btn' : 'fa fa-pause-circle-o pause-btn';

  return (
    <div className={!hide ? 'song-player-container' : 'hide'}>
      <div className='song-details song-name'>
        {songName}
      </div>

      <div className='song-controls'>

        <div onClick={prevSong} className='reverse-song'>
          <i className="fa fa-step-backward reverse" aria-hidden="true" />
        </div>

        <div className='play-btn'>
          <i onClick={!songPaused ? pauseSong : resumeSong} className={"fa play-btn" + showPlay} aria-hidden="true" />
        </div>

        <div onClick={nextSong} className='next-song'>
          <i className="fa fa-step-forward forward" aria-hidden="true" />
        </div>

      </div>
      <div className='song-progress-container'>
        <div className='song-progress'>
          <div style={{ width: state.timeElapsed ? state.timeElapsed * 16.5 : 0 }} className='song-expired' />
        </div>
      </div>
    </div>
  );
}


SongControls.propTypes = {
  timeElapsed: PropTypes.number,
  songPlaying: PropTypes.bool,
  songPaused: PropTypes.bool,
  songName: PropTypes.string,
  stop: PropTypes.func,
  resume: PropTypes.func,
  increaseSongTime: PropTypes.func,
  pause: PropTypes.func,
  songs: PropTypes.array,
  songDetails: PropTypes.object,
  audioControl: PropTypes.func
};
