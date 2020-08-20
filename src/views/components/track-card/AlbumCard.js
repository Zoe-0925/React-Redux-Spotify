import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import history from "../../../core/history"
import { fetchArtistsAlbumsLoading } from "../../../core/artist/Actions"
import { fetchAlbumTracksLoading } from "../../../core/track/Actions"
import PropTypes from 'prop-types';

export default function AlbumCard(props) {
    const dispatch = useDispatch()

    const fetchTracks = useCallback(() => {
        dispatch(fetchAlbumTracksLoading(props.albumId))
        history.push("/albums")
    }, [dispatch])

    const handleArtistClick = (e) => {
        const index = props.subtitle.indexOf(e.target.id)
        fetchArtists(props.artistIds[index])
        history.push("/artists/")
    }

    const fetchArtists = useCallback(
        (id) =>
            dispatch(fetchArtistsAlbumsLoading(id)
            ), [dispatch]
    )

    return (
        <div className="card" key={uuidv4()}>
            <img src={props.imgSrc} alt="track-card" key={uuidv4()} onClick={fetchTracks} />
            <div className="cardContent">
                <p className="card-title" onClick={fetchTracks}>{props.title}</p>
                <span>
                    {props.subtitle.map(each =>
                        <p className="card-subtitle" onClick={handleArtistClick} key={each} id={each}>{each}</p>)}
                </span>
            </div>

        </div>
    )
}

AlbumCard.prototype = {
    subtitle: PropTypes.array,
    albumId: PropTypes.string,
    subtitle: PropTypes.array,
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    artistIds: PropTypes.array,
}