import React from 'react';
import { useSelector } from "react-redux"
import { findAlbumList } from "../../../core/Selectors"
import AlbumCard from "../track-card/AlbumCard"
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function TrackCardList(props) {
    const cards = useSelector(findAlbumList(props.albumIds))

    let display = []
    display = cards === undefined ? [] : (props.limit > 0 && cards.length > props.limit) ? cards.slice(0, props.limit) : cards

    return (
        <div className="TrackCardList">
            <div className="title"><b>{props.fetchList}</b></div>
            <div className="list">
                {display.map(each =>
                    <AlbumCard title={each.get("albumName")} key={uuidv4()}
                        albumId={each.get("albumId")} artistIds={each.get("artistIds")}
                        subtitle={each.get("artistNames")}
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