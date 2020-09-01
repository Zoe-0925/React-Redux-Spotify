import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SongControls.css';


export default function SongControls(props) {
  const [state, setState] = useState({
    timeElapsed: props.timeElapsed
  })

  useEffect(() => {
    setState({
      timeElapsed: props.timeElapsed
    });
    if (!props.songPlaying) {
      clearInterval(state.intervalId);
    }

    if (nextProps.songPlaying && nextProps.timeElapsed === 0) {
      clearInterval(state.intervalId);
      calculateTime();
    }
    return () => {
      cleanup
    }
  }, [props.songPlaying, nextProps.timeElapsed])



  function calculateTime() {

    const intervalId = setInterval(() => {
      if (state.timeElapsed === 30) {
        clearInterval(state.intervalId);
        props.stopSong();
      } else if (!props.songPaused) {
        props.increaseSongTime(state.timeElapsed + 1);
      }
    }, 1000);

    setState({
      intervalId: intervalId
    });
  }

  const getSongIndex = () => {
    const { songs, songDetails } = props;
    const currentIndex = songs.map((song, index) => {
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
    const { songs, audioControl } = props;
    let currentIndex = getSongIndex();
    currentIndex === songs.length - 1 ? audioControl(songs[0]) : audioControl(songs[currentIndex + 1]);
  }

  const prevSong = () => {
    const { songs, audioControl } = props;
    let currentIndex = getSongIndex();
    currentIndex === 0 ? audioControl(songs[songs.length - 1]) : audioControl(songs[currentIndex - 1]);
  }

  const showPlay = props.songPaused ? 'fa fa-play-circle-o play-btn' : 'fa fa-pause-circle-o pause-btn';

  return (
    <div className='song-player-container'>

      <div className='song-details'>
        <p className='song-name'>{props.songName}</p>
        <p className='artist-name'>{props.artistName}</p>
      </div>

      <div className='song-controls'>

        <div onClick={prevSong} className='reverse-song'>
          <i className="fa fa-step-backward reverse" aria-hidden="true" />
        </div>

        <div className='play-btn'>
          <i onClick={!props.songPaused ? props.pauseSong : props.resumeSong} className={"fa play-btn" + showPlay} aria-hidden="true" />
        </div>

        <div onClick={nextSong} className='next-song'>
          <i className="fa fa-step-forward forward" aria-hidden="true" />
        </div>

      </div>

      <div className='song-progress-container'>
        <div className='song-progress'>
          <div style={{ width: state.timeElapsed * 16.5 }} className='song-expired' />
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
  artistName: PropTypes.string,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  increaseSongTime: PropTypes.func,
  pauseSong: PropTypes.func,
  songs: PropTypes.array,
  songDetails: PropTypes.object,
  audioControl: PropTypes.func
};
