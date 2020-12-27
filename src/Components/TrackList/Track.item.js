import React  from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as PlayIcon } from '../../svgs/play.svg'
import { ReactComponent as NoteIcon } from '../../svgs/note.svg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PropTypes from 'prop-types';

import { useFetchArtistPage, usePlayTrack, useSaveTrack } from "../CustomHooks"

export default function TracklistItem({ initialSaved, current, index }) {
    const { fetchArtistPage } = useFetchArtistPage()
    const { playIcon, playTrack, pauseTrack } = usePlayTrack(current, index)
    const { saved, toggleSave } = useSaveTrack(initialSaved)

    function handleClickArtist(e) {
        const artistId = e.target.id
        if (artistId !== undefined || "") {
            fetchArtistPage(e.target.id)
        }
    }

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