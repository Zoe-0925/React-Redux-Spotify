import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchAlbumTracksLoading } from "../../../core/track/Actions"
import PropTypes from 'prop-types';

export default function ArtistTrackCard(props) {

    const dispatch = useDispatch()

    const fetchTracks = useCallback(
        (id) => dispatch(fetchAlbumTracksLoading(id)),
        [dispatch]
    )

    return (
        <div className="ArtistTrackCard" onClick={() => { fetchTracks(props.albumId) }}>
            <img className="ArtistTrackCard-img" src={props.imgSrc} alt="track-card" key={uuidv4()} />
            <div className="title"><p>{props.albumName}</p></div>
        </div>
    )
}

ArtistTrackCard.prototype = {
    albumName: PropTypes.string,
    imgSrc: PropTypes.string,
    albumId: PropTypes.string,
}