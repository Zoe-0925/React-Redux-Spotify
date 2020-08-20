import React, { Fragment } from 'react';
import { ReactComponent as PlayIcon } from "../../../svgs/play.svg"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { ReactComponent as HeartIcon } from '../../../svgs/heart.svg'
import PropTypes from 'prop-types';

export default function TracklistPageHeader(props) {

    return (
        <Fragment>
            <div className="playlistPageInfo">
                <div className="playlistPageImage">
                    {props.imgSrc && <img src={props.imgSrc} alt="track-card" key="card-img" />}
                </div>

                <div className="playlistPageContent">
                    <p className="smallText uppercase bold">{props.title}</p>
                    <h1>{props.albumName}</h1>

                    <div className="playlistPageDesc">
                        <p className="spotify">{props.artistName}</p>
                    </div>
                </div>
            </div>
            <div className="playlistPageSongs">
                <div className="playlistButtons">
                    <span className="playIcon" onClick={props.playAlbum}>
                        <PlayIcon />
                    </span>
                    <div className="icons">
                        {props.saved &&
                            <FavoriteIcon className="icon iconsHeart coloredIcon" font-size="inherit" onClick={toggleSave} />}
                        {!props.saved &&
                            <FavoriteBorderIcon className="icon iconsHeart  coloredIcon" font-size="inherit" onClick={toggleSave} />}
                        }
                        <div className="icon iconsDots"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

TracklistPageHeader.prototype = {
    saveToLikes: PropTypes.func,
    playAlbum: PropTypes.func,
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    imgSr: PropTypes.string,
    title: PropTypes.string,
}