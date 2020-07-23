import React, { Fragment } from 'react';
import { ReactComponent as PlayIcon } from "../../../svgs/play.svg"
import { ReactComponent as HeartIcon } from '../../../svgs/heart.svg'
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default function TracklistPageHeader(props) {

    return (
        <Fragment>
            <div className="playlistPageInfo">
                <div className="playlistPageImage">
                    {props.imgSrc && <img src={props.imgSrc} alt="track-card" key="card-img" />}
                </div>

                <div className="playlistPageContent">
                    <p className="smallText uppercase bold" style={{ color: "white" }}>{props.title}</p>
                    <h1 style={{ color: "white", fontSize: "40px" }}>{props.albumName}</h1>

                    <div className="playlistPageDesc">
                        <p className="spotify" style={{ color: "white" }}>{props.artistName}</p>
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
                            <div className="icon iconsHeart" onClick={props.toggleSave}>
                                <Icon name='heart' className="coloredIcon" size='big' />
                            </div>}
                        {!props.saved &&
                            <div className="icon iconsHeart" onClick={props.toggleSave}>
                                <Icon name='heart outline' className="coloredIcon" size='big' />
                            </div>
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