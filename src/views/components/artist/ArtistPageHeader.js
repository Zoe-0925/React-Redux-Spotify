import React from 'react';
import PropTypes from 'prop-types';
import AccountBoxIcon from '@material-ui/icons/AccountBox';



export default function ArtistPageHeader(props) {
    return (
        <div className="ArtistPageHeader">
            {props.imgSrc !== "" ?
                <img
                    className="playlistPageImage"
                    src={props.imgSrc}
                    alt="artist"
                /> : <AccountBoxIcon className="playlistPageImage" fontSize="inherit"/>}
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

ArtistPageHeader.prototype = {
    imgSrc: PropTypes.string,
    artistName: PropTypes.string,
}