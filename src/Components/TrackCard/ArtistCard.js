import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../Actions/ArtistActions"
import PropTypes from 'prop-types';
import history from "../history"

export default function ArtistCard({ artist, round, subtitle }) {
    const dispatch = useDispatch()

    const fetchArtists = useCallback(
        () => {
            dispatch(fetchArtistsAlbumsLoading(artist))
            history.push("/artists")
        },
        [dispatch, artist],
    )

    return (
        <div className="card" key={uuidv4()} onClick={fetchArtists}>
            <div className={round ? "artist-card-image round" : ""}>
                <img src={artist.get("artistImg")} alt="TrackCard" key={uuidv4()} />
            </div>
            <div className="cardContent" >
                <p className="card-title">{artist.get("artistName")}</p>
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