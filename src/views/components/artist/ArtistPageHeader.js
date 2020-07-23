import React from 'react';
import PropTypes from 'prop-types';

export default function ArtistPageHeader(props) {
    return (
        <div className="ArtistPageHeader">
            <div className="playlistPageImage">
                <img
                    src={props.imgSrc}
                    alt="artist"
                />
            </div>
            <div className="playlistPageContent">
                <p className="smallText uppercase bold">VERIFIED ARTIST</p>
                <h1>{props.artistName}</h1>
                {props.saved &&
                <div className="follow-button unfilledIcon" onClick={props.toggleFollow}>Follow</div>}
                {!props.saved &&
                <div className="follow-button coloredIcon" onClick={props.toggleFollow}>UnFollow</div>}
            </div>
        </div>
    )
}

ArtistPageHeader.prototype={
    imgSrc:PropTypes.string,
    artistName:PropTypes.string,
}