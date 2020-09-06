import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useFetchAlbumPage, useFetchArtistPage} from "../../CustomHooks"
import PropTypes from 'prop-types';

export const useFetchArtist = () => {

}

export default function AlbumCard(props) {
    const { fetchTracks } = useFetchAlbumPage()
    const {fetchArtistPage} = useFetchArtistPage()

    const handleArtistClick = artistId => {
        const index = props.subtitle.indexOf(artistId)
        fetchArtistPage(props.artistIds[index])
    }

    return (
        <div className="card" key={uuidv4()}>
            <img src={props.imgSrc} alt="track-card" key={uuidv4()} onClick={()=>fetchTracks(props.albumId)} />
            <div className="cardContent">
                <p className="card-title" onClick={() => fetchTracks(props.albumId)}>{props.title}</p>
                {props.subtitle.map(each => {
                    return (
                        <span className="card-subtitle" onClick={() => handleArtistClick(each)} key={uuidv4()} id={each}>{each}</span>)
                })}
            </div>

        </div>
    )
}

AlbumCard.prototype = {
    subtitle: PropTypes.array,
    albumId: PropTypes.string,
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    artistIds: PropTypes.array,
}