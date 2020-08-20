import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function ArtistTrackCard(props) {

    return (
        <div className="ArtistTrackCard" onClick={props.onClick}>
            <img onClick={props.onClick} className={props.round ? "ArtistTrackCard-img round" : "ArtistTrackCard-img"} src={props.imgSrc} alt="track-card" key={uuidv4()} />
            <div className="title" onClick={props.onClick}><p>{props.name}</p></div>
        </div>
    )
}

ArtistTrackCard.prototype = {
    name: PropTypes.string,
    imgSrc: PropTypes.string,
}