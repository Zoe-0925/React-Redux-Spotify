import React, { useEffect, useState } from 'react';
import TrackCardListHeader from "./TrackCardListHeader"
import AlbumCard from "../track-card/AlbumCard"
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function TrackCardList(props) {
    const [cards, setCards] = useState([])

    useEffect(() => {
        if (props !== undefined && props.albumIds !== undefined && props.albums !== undefined) {
            const albumIds = props.albumIds
            let newState = props.albums.filter(item => albumIds.includes(item.get("albumId")))
            setCards(newState)

        }
    }, [props.albums, props.albumIds])

    let display = []
    display = cards === undefined ? [] : (props.limit > 0 && cards.length > props.limit) ? cards.slice(0, props.limit) : cards

    return (
        <div className="TrackCardList">
            <TrackCardListHeader title={props.fetchList} className="header" />
            <div className="list">
                {display.map(each =>
                    <AlbumCard title={each.get("albumName")} key={uuidv4()}
                        albumId={each.get("albumId")} artistIds={each.get("artistIds")}
                        subtitle={each.get("artistNames")}
                        goToAlbumPage={props.goToAlbumPage} goToArtistpage={props.goToArtistpage}
                        imgSrc={each.get("albumImg")} id={uuidv4()} />)}

            </div>
        </div>
    )
}

const { Map } = require('immutable');

TrackCardList.prototype = {
    fetchList: PropTypes.string.isRequired,
    albums: PropTypes.instanceOf(Map).isRequired,
    limit: PropTypes.number.isRequired,
    albumIds: PropTypes.array.isRequired,
}