import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../../core/artist/Actions"
import PropTypes from 'prop-types';
import history from "../../../core/history"

export default function ArtistCard({artist, round, subtitle}) {
    const dispatch = useDispatch()

    const fetchArtists = useCallback(
        () => {
            dispatch(fetchArtistsAlbumsLoading(artist))
            history.push("/artists")
        },
        [dispatch],
    )

    return (
        <div className="card" key={uuidv4()} onClick={fetchArtists}>
            <div className={round ? "artist-card-image round" : ""}>
                <img src={artistget("artistImg")} alt="track-card" key={uuidv4()}/>
            </div>
            <div className="cardContent" >
                <p className="card-title">{artistget("artistName")}</p>
                <p className="card-subtitle">{subtitle}</p>
            </div>
        </div>
    )
}

ArtistCard.prototype = {
    subtitle: PropTypes.string,
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    artistId: PropTypes.string,
}