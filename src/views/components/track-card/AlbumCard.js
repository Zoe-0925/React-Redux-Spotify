import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../../core/artist/Actions"
import { fetchAlbumTracksLoading } from "../../../core/track/Actions"
import { ReactComponent as PlayIcon } from '../../../svgs/play.svg'
import PropTypes from 'prop-types';



export default function AlbumCard(props) {
    const dispatch = useDispatch()

    const fetchTracks = useCallback(
        () => dispatch(fetchAlbumTracksLoading(props.albumId)
        ), [dispatch]
    )

    const goToAlbumPage = () => {
        props.goToAlbumPage()
        fetchTracks()
    }

    const handleArtistClick = (e) => {
        const index = props.subtitle.indexOf(e.target.id)
        const artistId = props.artistIds[index]
        fetchArtists(artistId)
        props.goToArtistpage()
    }

    const fetchArtists = useCallback(
        (id) =>
            dispatch(fetchArtistsAlbumsLoading(id)
            ), [dispatch]
    )

    return (
        <div className="card" key={uuidv4()}>
            <div className="card-img" onClick={goToAlbumPage}>
                <img src={props.imgSrc} alt="track-card" key={uuidv4()} />
            </div>
            <div className="cardContent">
                <p className="fetchTracks" onClick={goToAlbumPage} >{props.title}</p>
                <span>
                    {props.subtitle.map(each => <p className="fetchArtist" onClick={handleArtistClick} key={each} id={each}>{each}</p>)}
                </span>
            </div>
            <span className="playIcon">
                <PlayIcon />
            </span>
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