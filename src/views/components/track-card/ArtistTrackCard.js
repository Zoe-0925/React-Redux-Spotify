import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchAlbumTracksLoading } from "../../../core/track/Actions"
import PropTypes from 'prop-types';


export default function ArtistTrackCard(props) {

    const dispatch = useDispatch()

    const handleClick = () => {
        fetchTracks(props.albumId)
    }

    const fetchTracks = useCallback(
        (id) => dispatch(fetchAlbumTracksLoading(id)),
        [dispatch]
    )

    return (
        <div className="ArtistTrackCard" onClick={handleClick} style={{ height: "270px", width: "200px" }}>
            <img src={props.imgSrc} alt="track-card" key={uuidv4()}
                style={{ width: "100%", height: "200px", marginLeft: "10%", marginTop: "10%" }}
            />

            <div className="title"><p style={{ fontSize: "15px", textAlign: "center" }}>{props.albumName}</p></div>
        </div>
    )
}

ArtistTrackCard.prototype={
    albumName:PropTypes.string,
    imgSrc:PropTypes.string,
    albumId:PropTypes.string,
}