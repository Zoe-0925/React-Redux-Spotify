import React from 'react';
import PropTypes from 'prop-types';

export default function TrackCardListHeader(props) {

    return (
        <div className="TrackCardListHeader">
            <div className="title" onClick={props.onClick}><b>{props.title}</b></div>
            <div className="space"></div>
        </div>
    )
}

TrackCardListHeader.prototype = {
    onClick: PropTypes.func,
    title: PropTypes.string,
}