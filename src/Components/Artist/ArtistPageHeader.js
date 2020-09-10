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
                <p className="verified smallText uppercase bold">VERIFIED ARTIST</p>
                <p className="artist-name">{props.artistName}</p>
            </div>
        </div>
    )
}

ArtistPageHeader.prototype = {
    imgSrc: PropTypes.string,
    artistName: PropTypes.string,
}

/**Disabled:
 *     {props.saved &&
                    <div className="follow-button unfilledIcon" onClick={props.toggleFollow}>Follow</div>}
                {!props.saved &&
                    <div className="follow-button coloredIcon" onClick={props.toggleFollow}>UnFollow</div>}
 */