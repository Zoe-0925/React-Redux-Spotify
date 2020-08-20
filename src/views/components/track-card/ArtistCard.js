import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../../core/artist/Actions"
import { ReactComponent as PlayIcon } from '../../../svgs/play.svg'
import PropTypes from 'prop-types';
import history from "../../../core/history"

export default function ArtistCard(props) {
    const dispatch = useDispatch()

    const fetchArtists = useCallback(
        () => {
            dispatch(fetchArtistsAlbumsLoading(props.artistId))
            history.push("/artists")
        },
        [dispatch],
    )

    return (
        <div className="card" key={uuidv4()} onClick={fetchArtists}>
            <div className={props.round ? "artist-card-image round" : "artist-card-image"}>
                <img src={props.imgSrc} alt="track-card" key={uuidv4()}
                />
            </div>
            <div className="cardContent" >
                <p >{props.title}</p>
                <span>{props.subtitle}</span>

            </div>
            <span className="playIcon">
                <PlayIcon />
            </span>
        </div>
    )
}

ArtistCard.prototype = {
    subtitle: PropTypes.string,
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    artistId: PropTypes.string,
}