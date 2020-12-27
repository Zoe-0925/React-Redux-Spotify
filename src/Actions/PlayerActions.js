export const PAUSE_SONG = "PAUSE_SONG"
export const STOP_SONG = "STOP_SONG"
export const PLAY_SONG = "PLAY_SONG"
export const RESUME_SONG = "RESUME_SONG"
export const PLAY_PREVIOUS_SONG = "PLAY_PREVIOUS_SONG"
export const PLAY_NEXT_SONG = "PLAY_NEXT_SONG"

export const play = (current, previous, next) => ({
    type: PLAY_SONG,
    current: current,
    previous: previous,
    next: next
})

export const pause = () => ({
    type: PAUSE_SONG,
})

export const stop = () => ({
    type: STOP_SONG,
})

export const previous = () => ({
    type: PLAY_PREVIOUS_SONG
})

export const next = () => ({
    type: PLAY_NEXT_SONG
})

export const resume = () => ({
    type: RESUME_SONG
})

export const increaseSongTime = (time) => {
    return {
      type: 'INCREASE_SONG_TIME',
      time
    };
  };