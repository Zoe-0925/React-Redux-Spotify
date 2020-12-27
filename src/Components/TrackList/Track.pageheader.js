import React, { Fragment } from 'react';
//import { ReactComponent as PlayIcon } from "../../../svgs/play.svg"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PropTypes from 'prop-types';

export default function TracklistPageHeader(props) {

    const toggleSave = () => { }//TODO should be the from the props

    return (
        <Fragment>
            <div className="playlistPageImage">
                {props.imgSrc && <img src={props.imgSrc} alt="TrackCard" key="card-img" />}
            </div>

            <div className="playlistPageContent">
                <p className="smallText uppercase bold">{props.title}</p>
                <h1>{props.albumName}</h1>

                <div className="playlistPageDesc">
                    <p className="spotify">{props.artistName}</p>
                </div>
            </div>
            <div className="playlistPageSongs">
                <div className="playlistButtons">
                    <div className="icons">
                        {props.saved &&
                            <FavoriteIcon className="icon iconsHeart coloredIcon" fontSize="inherit" onClick={toggleSave} />}
                        {!props.saved &&
                            <FavoriteBorderIcon className="icon iconsHeart  coloredIcon" fontSize="inherit" onClick={toggleSave} />}

                        <div className="icon iconsDots"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

TracklistPageHeader.prototype = {
    saveToLikes: PropTypes.func,
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    imgSr: PropTypes.string,
    title: PropTypes.string,
}